import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-development-only';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Ensure the users table exists on startup
async function initializeDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'viewer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Non-destructive schema evolution for existing deployments
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'viewer';");
    // Ensure the very first account holds the owner keys
    await pool.query("UPDATE users SET role = 'owner' WHERE id = (SELECT MIN(id) FROM users);");
    
    console.log("Database initialized: 'users' schema mapped with RBAC.");
  } catch (error) {
    if (!process.env.DATABASE_URL) {
      console.warn("No DATABASE_URL found. Skipping Postgres DB initialization in local dev.");
    } else {
      console.error("Database initialization error:", error);
    }
  }
}
initializeDB();

// --- Auth Endpoints ---

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    // If no DB URL is provided, we can't register for real
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database not connected in development mode.' });
    }

    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) return res.status(400).json({ error: 'User already exists' });

    const countResult = await pool.query('SELECT COUNT(*) FROM users');
    const isFirstUser = parseInt(countResult.rows[0].count) === 0;
    const role = isFirstUser ? 'owner' : 'viewer';

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, passwordHash, role]
    );

    const user = newUser.rows[0];
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Temporary Dev Bypass if no database is connected
  if (!process.env.DATABASE_URL && email === 'test@test.com' && password === 'password') {
    const token = jwt.sign({ userId: 1 }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: 1, name: 'Dev User', email } });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// --- Generic Endpoints ---
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/users', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role FROM users ORDER BY id ASC');
    res.json({ users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// --- Admin Endpoints ---

// Middleware to verify Admin/Owner requests
async function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'owner' && decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Insufficient clearance' });
    }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/admin/users', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role, created_at as "lastActive", \'Active\' as status FROM users ORDER BY id ASC');
    res.json({ users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.put('/api/admin/users/:id/role', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!['viewer', 'contributor', 'manager', 'admin', 'owner'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }
  
  try {
    await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, id]);
    res.json({ success: true, role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

app.post('/api/admin/users', requireAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ error: 'Missing fields' });

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) return res.status(400).json({ error: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, passwordHash, role]
    );

    res.json({ success: true, id: newUser.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Creation failed' });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      next();
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

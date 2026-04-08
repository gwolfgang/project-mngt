import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If connecting to Render Postgres from outside, SSL is usually required.
  // Render's internal connections do not strictly require it, but we'll enable it safely.
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default pool;

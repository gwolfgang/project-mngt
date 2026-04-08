import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;
const isInternal = connectionString && (!connectionString.includes('.render.com') || connectionString.includes('@10.'));

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  connectionString,
  ssl: isInternal ? false : { rejectUnauthorized: false }
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;

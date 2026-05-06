import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  // optional settings
});

export const query = (text, params) => pool.query(text, params);

export const getClient = () => pool.connect();

export default pool;

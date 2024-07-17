import pool from '../../config/db';

const createUsersTable = async () => {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        address VARCHAR(42) UNIQUE NOT NULL,
        name VARCHAR(100),
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('User table created successfully');
  } catch (err) {
    console.error('Error creating user table:', err);
  } finally {
    client.release();
  }
};

createUsersTable().catch(console.error);

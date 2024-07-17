import pool from '../config/db';

export const getUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

export const getUserByAddress = async (address: string) => {
  const result = await pool.query('SELECT * FROM users WHERE address = $1', [address]);
  return result.rows[0];
};

export const createUser = async (address: string, name: string, email: string) => {
  const result = await pool.query(
    'INSERT INTO users (address, name, email) VALUES ($1, $2, $3) RETURNING *',
    [address, name, email]
  );
  return result.rows[0];
};

import { Request, Response } from 'express';
import pool from '../config/db';

// 获取所有用户
export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 获取特定用户
export const getUserByAddress = async (req: Request, res: Response) => {
  const { address } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE address = $1', [address]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 创建新用户
export const createUser = async (req: Request, res: Response) => {
  const { address, name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (address, name, email) VALUES ($1, $2, $3) RETURNING *',
      [address, name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

import { Request, Response } from 'express';
import { getUserByAddress } from '../services/userService';

export const getUserInfo = async (req: Request, res: Response) => {
  const { ca } = req.params;
  try {
    const user = await getUserByAddress(ca);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

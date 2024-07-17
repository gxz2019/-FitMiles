import express from 'express';
import { getUsers, getUserByAddress, createUser } from '../services/userService';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users/:address', async (req, res) => {
  try {
    const user = await getUserByAddress(req.params.address);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { address, name, email } = req.body;
    const newUser = await createUser(address, name, email);
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

// src/index.ts

import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

interface User {
  id: number;
  username: string;
  email: string;
  address: string;
}

const users: User[] = [
  { id: 1, username: 'john_doe', address: '',email: 'john.doe@example.com' },
  { id: 2, username: 'jane_smith', address: '', email: 'jane.smith@example.com' },
];

// API endpoint to get all users
app.get('/api/users', (req: Request, res: Response) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

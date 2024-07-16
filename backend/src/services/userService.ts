interface User {
  address: string;
  tokensEarned: number;
  runsCompleted: number;
}

const users: User[] = [
  { address: '0xD1bB8691b7EdD48d81b2a37eD62545Be04df2337', tokensEarned: 1200, runsCompleted: 15 },
  { address: '0x456', tokensEarned: 800, runsCompleted: 10 },
];

export const getUserByAddress = async (address: string): Promise<User | null> => {
  const user = users.find(user => user.address === address);
  return user || null;
};

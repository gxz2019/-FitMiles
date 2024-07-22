import { fetchData } from './apiClient';
import { UsersPostRequest } from '../openapi/models';

export const getUsers = () => fetchData('users');

export const getUserByAddress = (address: string) => fetchData(`users/${address}`);

export const createUser = (user: UsersPostRequest) => 
  fetchData('users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

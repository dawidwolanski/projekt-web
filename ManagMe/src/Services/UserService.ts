import { User } from '../Models/User';

<<<<<<< HEAD
const getCurrentUser = (): User | null => {
  const token = localStorage.getItem('token');
  if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload
  } 
  return null
=======

const users: User[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', role: 'admin' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', role: 'developer' },
  { id: '3', firstName: 'Mike', lastName: 'Johnson', role: 'devops' },
];

const getUsers = (): User[] => users;

const getCurrentUser = (): User => {
  // Załóżmy, że zalogowany jest pierwszy użytkownik na liście (admin)
  return users[1];
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233
};

const storeToken = (data: any) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
}

const deleteTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
}

export default { getCurrentUser, storeToken, deleteTokens };
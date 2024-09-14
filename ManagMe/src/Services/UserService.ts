import { User } from '../Models/User';

const getCurrentUser = (): User | null => {
  const token = localStorage.getItem('token');
  if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload
  } 
  return null
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
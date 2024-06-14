import { collection, getDocs } from 'firebase/firestore';
import { User } from '../Models/User';
import db from '../db';

const getCurrentUser = (): User | null => {
  const token = localStorage.getItem('token');
  if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload
  } 
  return null
};

const getUsersList = async () => {
  const querySnapshot = await getDocs(collection(db, "users/"));

    const u: User[] = []

    querySnapshot.forEach(doc => {
      const d = doc.data() as User;
      u.push(d);
    });
    
    return u
}

const storeToken = (data: any) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
}

const deleteTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
}

export default { getCurrentUser, storeToken, deleteTokens, getUsersList };
import { User } from '../Models/User';


const users: User[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', role: 'admin' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', role: 'developer' },
  { id: '3', firstName: 'Mike', lastName: 'Johnson', role: 'devops' },
];

const getUsers = (): User[] => users;

const getCurrentUser = (): User => {
  // Załóżmy, że zalogowany jest pierwszy użytkownik na liście (admin)
  return users[1];
};

export default { getUsers, getCurrentUser };
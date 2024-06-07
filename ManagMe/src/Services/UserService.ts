import { User } from '../Models/User';

class UserService {
  private static currentUser: User = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe'
  };

  static getCurrentUser(): User {
    return this.currentUser;
  }
}

export default UserService;
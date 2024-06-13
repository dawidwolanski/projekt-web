export interface User {
  firstName: string;
  lastName: string;
  role: 'admin' | 'devops' | 'developer';
  login: string;
  password: string;
}
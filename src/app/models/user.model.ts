export interface User {
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  role?: 'superadmin';
}
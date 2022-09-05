export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
  profileImage?: string;
  role: 'super' | 'groupadmin' | 'groupassis' | 'member';
}
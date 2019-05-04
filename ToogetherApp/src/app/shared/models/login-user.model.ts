import { User } from './User.model';

export interface AuthData {

  User: User;
  id: string;
  token: string;
  expiresIn: number;
  success: boolean;
}

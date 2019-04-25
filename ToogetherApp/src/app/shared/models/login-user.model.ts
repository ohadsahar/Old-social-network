import { User } from './User.model';

export interface LoggedInData {

  User: User;
  id: string;
  token: string;
  success: boolean;
}

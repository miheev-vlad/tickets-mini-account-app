import { IUser } from 'src/app/types/user.interface';

export interface UserModel {
  userInfo: IUser | null;
  profileData: Omit<IUser, 'password'> | null;
}

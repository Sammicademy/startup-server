import { UserDocument } from './user.model';

export type RoleUser = 'ADMIN' | 'INSTRUCTOR' | 'USER';
export type UserTypeData = keyof UserDocument;

export interface InterfaceEmailAndPassword {
  email: string;
  password: string;
}

export class UpdateUserDto {
  firstName: string;
  lastName: string;
  birthday: string;
  job: string;
  bio: string;
  avatar: string;
}

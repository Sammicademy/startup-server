import { UserDocument } from './user.model';

export type RoleUser = 'ADMIN' | 'INSTRUCTOR' | 'USER';
export type UserTypeData = keyof UserDocument;

export interface InterfaceEmailAndPassword {
  email: string;
  password: string;
}

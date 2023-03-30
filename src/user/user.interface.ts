import { UserDocument } from './user.model';

export type RoleUser = 'ADMIN' | 'ISTRUCTOR' | 'USER';
export type UserTypeData = keyof UserDocument;

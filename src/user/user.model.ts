import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { Course } from 'src/course/course.model';
import { RoleUser } from './user.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  fullName: string;

  @Prop()
  password: string;

  @Prop()
  role: RoleUser;

  @Prop()
  avatar: string;

  @Prop()
  job: string;

  @Prop()
  customerId: string;

  @Prop()
  instructorAccountId: string;

  @Prop()
  createdAt: string;

  @Prop()
  bio: string;

  @Prop()
  birthday: string;

  @Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Course' }])
  courses: Course[];
}

export const UserSchema = SchemaFactory.createForClass(User);

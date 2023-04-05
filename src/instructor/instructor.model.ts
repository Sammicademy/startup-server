import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { User } from 'src/user/user.model';

export type InstructorDocument = HydratedDocument<Instructor>;

@Schema({ timestamps: true })
export class Instructor {
  @Prop()
  socialMedia: string;

  @Prop({ type: SchemaMS.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ default: false })
  approved: boolean;
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);

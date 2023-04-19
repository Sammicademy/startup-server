import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { Section } from 'src/section/section.model';
import { User } from 'src/user/user.model';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ type: SchemaMS.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Section' }])
  sections: Section[];

  @Prop({ unique: true, required: true })
  slug: string;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop([String])
  learn: string[];

  @Prop([String])
  requirements: string[];

  @Prop([String])
  tags: string[];

  @Prop()
  description: string;

  @Prop()
  level: string;

  @Prop()
  category: string;

  @Prop()
  price: number;

  @Prop()
  previewImage: string;

  @Prop()
  title: string;

  @Prop()
  exerpt: string;

  @Prop()
  language: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

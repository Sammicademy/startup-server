import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { Lesson } from 'src/lesson/lesson.model';

export type SectionDocument = HydratedDocument<Section>;

@Schema({ timestamps: true })
export class Section {
  @Prop()
  title: string;

  @Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Lesson' }])
  lessons: Lesson[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);

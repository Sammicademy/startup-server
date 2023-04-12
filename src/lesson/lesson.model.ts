import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ timestamps: true })
export class Lesson {
  @Prop()
  name: string;

  @Prop()
  material: string;

  @Prop()
  embedVideo: string;

  @Prop()
  hour: number;

  @Prop()
  minute: number;

  @Prop()
  second: number;

  @Prop([String])
  completed: string[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

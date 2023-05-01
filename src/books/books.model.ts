import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BooksDocument = HydratedDocument<Books>;

@Schema({ timestamps: true })
export class Books {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  image: string;
}

export const BooksSchema = SchemaFactory.createForClass(Books);

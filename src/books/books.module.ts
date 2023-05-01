import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { Books, BooksSchema } from './books.model';
import { BooksService } from './books.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Books.name, schema: BooksSchema }])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

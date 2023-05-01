import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Books, BooksDocument } from './books.model';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Books.name) private booksModel: Model<BooksDocument>) {}

  async create(createBookDto: CreateBookDto) {
    return await this.booksModel.create(createBookDto);
  }

  async findAll() {
    return await this.booksModel.find({}).exec();
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return await this.booksModel.findByIdAndUpdate(id, updateBookDto, { new: true });
  }

  async remove(id: string) {
    return await this.booksModel.findByIdAndRemove(id);
  }
}

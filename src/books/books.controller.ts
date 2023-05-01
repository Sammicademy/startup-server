import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @HttpCode(200)
  @Post('create')
  @Auth('ADMIN')
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @HttpCode(200)
  @Get('find-all')
  findAll() {
    return this.booksService.findAll();
  }

  @HttpCode(200)
  @Patch('update/:id')
  @Auth('ADMIN')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @HttpCode(200)
  @Delete('delete/:id')
  @Auth('ADMIN')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}

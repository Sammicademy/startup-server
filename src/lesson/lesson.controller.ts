import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { LessonDto } from './lesson.dto';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @HttpCode(200)
  @Post('create/:sectionId')
  @Auth('INSTRUCTOR')
  async createLesson(@Body() dto: LessonDto, @Param('sectionId') sectionId: string) {
    return this.lessonService.createLesson(dto, sectionId);
  }

  @HttpCode(200)
  @Put('edit/:lessonId')
  @Auth('INSTRUCTOR')
  async editLesson(@Body() dto: LessonDto, @Param('lessonId') lessonId: string) {
    return this.lessonService.editLesson(dto, lessonId);
  }

  @HttpCode(200)
  @Delete('delete/:lessonId/:sectionId')
  @Auth('INSTRUCTOR')
  async deleteLesson(@Param('lessonId') lessonId: string, @Param('sectionId') sectionId: string) {
    return this.lessonService.deleteLesson(sectionId, lessonId);
  }

  @HttpCode(200)
  @Get('get/:sectionId')
  async getLesson(@Param('sectionId') sectionId: string) {
    return this.lessonService.getLesson(sectionId);
  }

  @HttpCode(200)
  @Put('complete/:lessonId')
  @Auth()
  async completeLesson(@User('_id') _id: string, @Param('lessonId') lessonId: string) {
    return this.lessonService.completeLesson(_id, lessonId);
  }

  @HttpCode(200)
  @Put('uncomplete/:lessonId')
  @Auth()
  async uncompleteLesson(@User('_id') _id: string, @Param('lessonId') lessonId: string) {
    return this.lessonService.uncompleteLesson(_id, lessonId);
  }
}

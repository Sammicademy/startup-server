import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { CourseBodyDto } from './coourse.dto';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @HttpCode(200)
  @Post('create')
  @Auth('INSTRUCTOR')
  async createCourse(@Body() dto: CourseBodyDto, @User('_id') _id: string) {
    return this.courseService.createCourse(dto, _id);
  }

  @HttpCode(200)
  @Patch('edit/:courseId')
  @Auth('INSTRUCTOR')
  async editCourse(@Body() dto: CourseBodyDto, @Param('courseId') courseId: string) {
    return this.courseService.editCourse(dto, courseId);
  }

  @HttpCode(200)
  @Delete('delete/:courseId')
  @Auth('INSTRUCTOR')
  async deleteCourse(@Param('courseId') courseId: string, @User('_id') _id: string) {
    return this.courseService.deleteCourse(courseId, _id);
  }

  @HttpCode(200)
  @Put('activate/:courseId')
  @Auth('INSTRUCTOR')
  async activateCourse(@Param('courseId') courseId: string) {
    return this.courseService.activateCourse(courseId);
  }

  @HttpCode(200)
  @Put('draft/:courseId')
  @Auth('INSTRUCTOR')
  async draftCourse(@Param('courseId') courseId: string) {
    return this.courseService.draftCourse(courseId);
  }

  @HttpCode(200)
  @Put('drag/:courseId')
  @Auth('INSTRUCTOR')
  async dragCourseSections(
    @Param('courseId') courseId: string,
    @Body() body: { sections: string[] },
  ) {
    return this.courseService.dragCourseSections(courseId, body.sections);
  }

  @HttpCode(200)
  @Get('all')
  async getCourses(@Query('language') language: string, @Query('limit') limit: string) {
    return this.courseService.getCourses(language, limit);
  }

  @HttpCode(200)
  @Get('admin-all-courses')
  async getAllAdminCourses() {
    return this.courseService.getAdminCourses();
  }

  @HttpCode(200)
  @Get('detailed-course/:slug')
  getDetailedCourse(@Param('slug') slug: string) {
    return this.courseService.getDetailedCourse(slug);
  }
}

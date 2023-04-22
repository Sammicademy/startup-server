import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { InstructorApplyDto } from './dto/instructor.dto';
import { InstructorService } from './instructor.service';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @HttpCode(200)
  @Post('apply')
  async applyAsInstructor(@Body() dto: InstructorApplyDto) {
    return this.instructorService.applyAsInstructor(dto);
  }

  @HttpCode(200)
  @Get('course-all')
  @Auth('INSTRUCTOR')
  async getAllCourses(@User('_id') _id: string) {
    return this.instructorService.getAllCourses(_id);
  }

  @HttpCode(200)
  @Get('course/:slug')
  @Auth('INSTRUCTOR')
  async getDetailedCourse(@Param('slug') slug: string) {
    return this.instructorService.getDetailedCourse(slug);
  }

  @HttpCode(200)
  @Get('all')
  async getInstructors(@Query('language') language: string, @Query('limit') limit: string) {
    return this.instructorService.getInstructors(language, limit);
  }
}

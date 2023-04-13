import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { SectionDto } from './section.dto';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @HttpCode(200)
  @Post('create/:courseId')
  @Auth('INSTRUCTOR')
  async createSection(@Body() dto: SectionDto, @Param('courseId') courseId: string) {
    return this.sectionService.createSection(dto, courseId);
  }

  @HttpCode(200)
  @Delete('delete/:sectionId/:courseId')
  @Auth('INSTRUCTOR')
  async deleteSection(@Param('sectionId') sectionId: string, @Param('courseId') courseId: string) {
    return this.sectionService.deleteSection(sectionId, courseId);
  }

  @HttpCode(200)
  @Put('edit/:sectionId')
  @Auth('INSTRUCTOR')
  async editSection(@Param('sectionId') sectionId: string, @Body() dto: SectionDto) {
    return this.sectionService.editSection(sectionId, dto);
  }

  @HttpCode(200)
  @Get('get/:courseId')
  async getSection(@Param('courseId') courseId: string) {
    return this.sectionService.getSection(courseId);
  }
}

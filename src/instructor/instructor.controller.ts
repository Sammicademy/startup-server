import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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
}

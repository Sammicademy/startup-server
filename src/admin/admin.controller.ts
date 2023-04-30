import { Body, Controller, Get, HttpCode, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApproveInstructorDto } from './admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @HttpCode(200)
  @Get('all-instructors')
  @Auth('ADMIN')
  async getAllInstructors() {
    return this.adminService.getAllInstructors();
  }

  @HttpCode(200)
  @Put('approve-instructor')
  @Auth('ADMIN')
  async aproveInstructor(@Body() body: ApproveInstructorDto) {
    return this.adminService.aproveInstructor(body.instructorId);
  }

  @HttpCode(200)
  @Put('delete-instructor')
  @Auth('ADMIN')
  async deleteInstructor(@Body() body: ApproveInstructorDto) {
    return this.adminService.deleteIntructor(body.instructorId);
  }
}

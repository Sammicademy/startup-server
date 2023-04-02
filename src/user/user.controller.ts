import { Body, Controller, Get, HttpCode, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { InterfaceEmailAndPassword } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@User('_id') _id: string) {
    return this.userService.byId(_id);
  }

  @HttpCode(200)
  @Put('edit-password')
  async editPassword(@Body() dto: InterfaceEmailAndPassword) {
    return this.userService.editPassword(dto);
  }
}

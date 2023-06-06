import { Body, Controller, Get, HttpCode, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { InterfaceEmailAndPassword, UpdateUserDto } from './user.interface';
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

  @HttpCode(200)
  @Put('update')
  @Auth()
  updateUser(@Body() dto: UpdateUserDto, @User('_id') _id: string) {
    return this.userService.updateUser(dto, _id);
  }

  @HttpCode(200)
  @Get('transactions')
  @Auth()
  allTransactions(@User('customerId') customerId: string) {
    return this.userService.allTransactions(customerId);
  }

  @HttpCode(200)
  @Get('my-courses')
  @Auth()
  myCourses(@User('_id') _id: string) {
    return this.userService.myCourses(_id);
  }
}

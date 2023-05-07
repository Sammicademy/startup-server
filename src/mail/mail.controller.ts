import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @HttpCode(200)
  @Post('send-otp')
  async sendOtp(@Body() dto: { email: string; isUser: boolean }) {
    return this.mailService.sendOtpVerification(dto.email, dto.isUser);
  }

  @HttpCode(200)
  @Post('verify-otp')
  async verifyOtp(@Body() dto: { email: string; otpVerification: string }) {
    return this.mailService.verifyOtp(dto.email, dto.otpVerification);
  }

  @HttpCode(200)
  @Post('books/:bookId')
  @Auth('USER')
  recieveBooks(@Param('bookId') bookId: string, @User('_id') _id: string) {
    return this.mailService.recieveBooks(bookId, _id);
  }
}

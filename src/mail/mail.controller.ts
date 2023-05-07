import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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
  @Post('books')
  @Auth('USER')
  async recieveBooks(@Body() dto: { bookId: string }, @User('email') email: string) {
    return this.mailService.recieveBooks(dto.bookId, email);
  }
}

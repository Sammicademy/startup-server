import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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
}

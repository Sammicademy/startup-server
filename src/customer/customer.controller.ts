import { Controller, Get, HttpCode } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @HttpCode(200)
  @Get('saved-cards')
  @Auth('USER')
  getSavedCustomerCard(@User('customerId') customerId: string) {
    return this.customerService.savedCustomerCard(customerId);
  }
}

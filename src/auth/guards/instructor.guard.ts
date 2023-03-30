import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDocument } from 'src/user/user.model';

@Injectable()
export class OnlyInstructorGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: UserDocument }>();
    const user = request.user;

    if (user.role !== 'ISTRUCTOR')
      throw new ForbiddenException("Sorry you don't have access to the page");

    return user.role === 'ISTRUCTOR' && true;
  }
}

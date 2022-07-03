import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UserService } from './user.service';

@Controller('auth/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    return this.userService.createUser(request);
  }
}

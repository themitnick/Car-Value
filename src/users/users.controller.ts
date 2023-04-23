import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {

  @Post('/signup')
  createUser(@Body() createUser: CreateUserDto) {
    console.log(createUser);
  }

}

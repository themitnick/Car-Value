import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth/users')
export class UsersController {

  constructor(private userService: UsersService){}

  @Post('/signup')
  createUser(@Body() createUser: CreateUserDto) {
    this.userService.createUser(createUser.email, createUser.password);
  }

  @Get('/:id')
  findUserById(@Param('id') id: string) {
    return this.userService.findOneUser(parseInt(id));
  }

  @Get()
  findAllUsersByEmail(@Query('email') email: string) {
    return this.userService.findUsersByEmail(email);
  }

  @Get()
  findAllUsers() {
    return this.userService.findUsers();
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUSer(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(parseInt(id), updateUserDto);
  }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';

@Injectable()
export class UsersService {


  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  createUser(email: string, password: string) {
    const user = this.userRepository.create({ email, password });

    return this.userRepository.save(user);
  }

  async findOneUser(id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User with ID: ${id} is not found`);
    }

    return user;
  }

  findUsersByEmail(email: string) {
    return this.userRepository.find({
      where: {
        email: email
      }
    });
  }

  findUsers() {
    return this.userRepository.find();
  }

  async updateUser(id: number, attrs: Partial<User>) {

    const user = await this.findOneUser(id);
    
    Object.assign(user, attrs);

    return this.userRepository.save(user);

  }

  async removeUSer(id: number) {

    const user = await this.findOneUser(id);

    return this.userRepository.remove(user);
  }

}

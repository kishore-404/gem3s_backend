import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userModel.create({
      ...data,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// export type User = any;

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.userModel.create(createUserDto);
      return createdUser;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error);
    }

  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username}).exec();
  }

  async findOne_byid(id: ObjectId): Promise<User> {
    return this.userModel.findById({ _id: id }).exec();
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userModel.findByIdAndUpdate(id, {
      $set: updateUserDto,
    });
    return updateUser
  }

  async remove(id: ObjectId) {
    const deletedCat = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }

}

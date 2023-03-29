import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard.guard';
import { Model, ObjectId } from 'mongoose';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/schema/user.schema';
import { Roles } from 'src/auth/role/role.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Role } from 'src/auth/role/role.enum';


@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /*##################################### REGISTER USER START ############################################*/

  @UseGuards(JwtAuthGuard,RoleGuard)  
  @Roles(Role.ADMIN)
  @Post('register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'The created record', type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  /*##################################### REGISTER USER END ############################################*
  /*##################################### VIEW ALL USERS START ############################################*/

  @UseGuards(JwtAuthGuard,RoleGuard)  
  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'view all user' })
  @ApiResponse({ status: 200, description: 'The found record', type: User })
  findAll() {
    return this.userService.findAll();
  }
  /*##################################### VIEW ALL USERS END ############################################*/

  /*##################################### VIEW SINGE USER BY USERNAME (seacrh by username) START ############################################*/
  @UseGuards(JwtAuthGuard,RoleGuard)  
  @Roles(Role.ADMIN)
  @Get('/find/:username')
  @ApiOperation({ summary: 'view single user with username' })
  @ApiResponse({ status: 200, description: 'The found record', type: User })
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }
  /*##################################### VIEW SINGE USER BY USERNAME END ############################################*/

  /*##################################### VIEW SINGE USER BY USERID START ############################################*/
  @UseGuards(JwtAuthGuard,RoleGuard)  
  @Roles(Role.ADMIN)
  @Get('data/:id')
  @ApiOperation({ summary: 'view single user by id' })
  @ApiResponse({ status: 200, description: 'The found record', type: User })
  findOne_byid(@Param('id') id: ObjectId) {
    return this.userService.findOne_byid(id);
  }
  /*##################################### VIEW SINGE USER BY USERID END ############################################*/

  /*##################################### UPDATE USERS START ############################################*/
  @UseGuards(JwtAuthGuard,RoleGuard)  
  @Roles(Role.ADMIN)
  @Patch('edit/:id')
  @ApiOperation({ summary: 'Edit/Update user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  /*##################################### UPDATE USER END ############################################*/

  /*##################################### DELETE SINGLE USER START ############################################*/
  @UseGuards(JwtAuthGuard,RoleGuard)  
  @Roles(Role.ADMIN)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: ObjectId) {
    return this.userService.remove(id);
  }
  /*#####################################  DELETE SINGLE USER END ############################################*/

}

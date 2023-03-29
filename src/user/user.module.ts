import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/auth/role/role.guard';
// import { RolesGuard } from 'src/utils/guards/role.guard';


@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
      ],
    ),
  ],
  controllers: [UserController],
  providers: [UserService, RoleGuard],
  exports: [UserService]
})
export class UserModule { }

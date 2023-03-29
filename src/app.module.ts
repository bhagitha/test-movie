import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './utils/guards/role.guard';
import { AuthModule } from './auth/auth.module';
import { RoleGuard } from './auth/role/role.guard';


@Module({

  imports: [MongooseModule.forRoot(
    'mongodb+srv://bhagithatechie:VdJ211ZXGurld9Jt@cluster0.ujuydyt.mongodb.net/LilacTestDb?retryWrites=true&w=majority'),
    UserModule, MovieModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

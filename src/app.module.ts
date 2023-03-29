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
    process.env.DB_HOST_URL),
    UserModule, MovieModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

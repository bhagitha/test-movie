import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie, MovieSchema } from 'src/schema/movie.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Movie.name, schema: MovieSchema },
      ],
    ),
  ],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}

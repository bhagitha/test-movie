import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Movie, MovieDocument } from 'src/schema/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';


@Injectable()
export class MovieService {

  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>
  ) { }

  /*##################################### TO CREATE MOVIE START ############################################*/

  async create(createMovieDto: CreateMovieDto, userid: ObjectId) {
    try {
      createMovieDto.user = userid;
      const createdMovie = await this.movieModel.create(createMovieDto);
      return { data: createdMovie, status: 200, message: "movie added" };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  /*##################################### TO CREATE MOVIE END ############################################*/

  /*##################################### TO FIND ALL MOVIE START ############################################*/

  async findAll() {
    try {
      const data = await this.movieModel.find().exec();
      return { data: data, status: 200, message: "all movie list" };
    } catch (error) {
      throw new NotFoundException(error);
    }

  }
  /*##################################### TO FIND ALL MOVIE END ############################################*/

  /*##################################### TO FIND SINGLE MOVIE START ############################################*/

  async findOne(id: ObjectId) {
    try {
      const data = await this.movieModel.findById({ _id: id }).exec();
      return { data: data, status: 200, message: "all movie list" };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  /*##################################### TO FIND SINGLE MOVIE END ############################################*/

  /*##################################### TO UPDATE MOVIE START ############################################*/

  async update(id: ObjectId, updateMovieDto: UpdateMovieDto) {
    try {
      const updateMovie = await this.movieModel.findByIdAndUpdate(id, {
        $set: updateMovieDto,
      });
      return updateMovie
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  /*##################################### TO UPDATE MOVIE END ############################################*/

  /*##################################### TO DELETE MOVIE START ############################################*/

  async remove(id: ObjectId) {
    try {
      const deletedMovie = await this.movieModel
        .findByIdAndRemove({ _id: id })
        .exec();
      return deletedMovie;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  /*##################################### TO DELETE MOVIE END ############################################*/
}

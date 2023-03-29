import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard.guard';
import { Movie } from 'src/schema/movie.schema';
import { ObjectId } from 'mongoose';
import { GetCurrentUserById } from 'src/utils/get-user-by-id.decorator';

@ApiBearerAuth()
@ApiTags('movie')
@Controller('movie')
export class MovieController {
  
  constructor(private readonly movieService: MovieService) {}

  /*##################################### TO CREATE MOVIE START ############################################*/

  @Post('add')
  @ApiOperation({ summary: 'create movie' })
  @ApiResponse({status: 200, description: 'The found record',type: Movie})
  @UseGuards(JwtAuthGuard)
  create(@Body() createMovieDto: CreateMovieDto, @GetCurrentUserById() Jwtdta: any) {
    return this.movieService.create(createMovieDto,Jwtdta.userid);
  }
  /*##################################### TO CREATE MOVIE END ############################################*/

  /*##################################### TO FIND ALL MOVIE START############################################*/

  @Get('all')
  @ApiOperation({ summary: 'view all moview list' })
  @ApiResponse({status: 200, description: 'The found record',type: Movie})
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.movieService.findAll();
  }
  /*##################################### TO FIND ALL MOVIE END############################################*/

  /*##################################### TO FIND SINGLE MOVIE START############################################*/

  @Get(':id')
  @ApiOperation({ summary: 'view single moview details' })
  @ApiResponse({status: 200, description: 'The found record',type: Movie})
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: ObjectId) {
    return this.movieService.findOne(id);
  }
  /*##################################### TO FIND SINGLE MOVIE END ############################################*/

  /*##################################### TO UPDATE MOVIE START############################################*/

  @Patch(':id')
  @ApiOperation({ summary: 'Edit/update movie' })
  @ApiResponse({status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: ObjectId, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }
  /*##################################### TO UPDATE MOVIE END ############################################*/

  /*##################################### TO DELETE MOVIE START ############################################*/

  @Delete(':id')
  @ApiOperation({ summary: 'Delete movie' })
  @ApiResponse({status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: ObjectId) {
    return this.movieService.remove(id);
  }
  /*##################################### TO DELETE MOVIE END ############################################*/

}

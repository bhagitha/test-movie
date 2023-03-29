import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDate,
} from 'class-validator';
import { Date } from 'mongoose';

export class CreateMovieDto {

    @ApiProperty({ example: 'Lagaan', default: null })
    @IsString()
    title:string;

    
    @ApiProperty({ example: 'Ashuthosh', default: null })
    @IsString()
    director:string;
    
    @ApiProperty({ example: '15/06/2001'})
    @IsDate()
    release_date: Date;
    
    @ApiProperty({ example: 5, default: 5})
    @IsNumber()
    rating:number;

    @ApiProperty({ example: '6422029712d99e8496fae840'})
    user:any;
}

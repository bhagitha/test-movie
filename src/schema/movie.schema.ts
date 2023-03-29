import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose,{ Date, HydratedDocument } from 'mongoose';
import { Transform, Type } from '@nestjs/class-transformer';
import { User } from './user.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ timestamps: true })
export class Movie {
    
  @Prop({ required: true,index: true})
  title: string;

  @Prop({ required: true })
  director: string;

  @Prop({type : Date, required: true })
  release_date: Date;

  @Prop({ required: false })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User;
  
  
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
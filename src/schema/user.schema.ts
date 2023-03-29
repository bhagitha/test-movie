import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/role/role.enum';


export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    
  @Prop({required: true})
  name: string;

  @Prop({required: true, lowercase: true, index: true, unique: true, sparse: true })
  username: string;

  @Prop({required: true})
  password: string;

  @Prop()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
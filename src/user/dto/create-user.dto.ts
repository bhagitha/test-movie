import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Role } from 'src/auth/role/role.enum';


export class CreateUserDto {

    @ApiProperty({ example: 'Bhagitha', default: null })
    @IsString()
    name:string;
    
    @ApiProperty({ example: 'Bhagitha123', default: null })
    @IsString()
    username:string;
    
    @ApiProperty({ example: '123', default: "123" })
    @IsString()
    password:string;
    
    @ApiProperty({ example: 'admin', default: 'user'})
    role:Role;
}

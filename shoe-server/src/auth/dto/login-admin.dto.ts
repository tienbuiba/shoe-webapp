import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

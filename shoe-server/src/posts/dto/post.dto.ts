import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  shortDesc: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  longDesc: string;

  @IsArray()
  @IsNotEmpty()
  images: any;
}

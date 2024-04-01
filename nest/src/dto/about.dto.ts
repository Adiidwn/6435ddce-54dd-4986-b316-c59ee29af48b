import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AboutDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  display_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  gender: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  birthday: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  horoscope: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  zodiac: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  heigth: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  weight: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  image: string;
}

export class updateProfile {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  display_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  gender: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  birthday: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  horoscope: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  zodiac: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  heigth: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  weight: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  image: string;
}

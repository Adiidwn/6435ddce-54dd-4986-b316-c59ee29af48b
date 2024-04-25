import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AboutDto } from 'src/dto/about.dto';
import { QueryParams } from 'src/dto/request.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly postService: ProfileService) {}

  @Post()
  async create(@Body() aboutDto: AboutDto, @Query() params: QueryParams) {
    try {
      return await this.postService.createProfile(aboutDto, params);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getProfile(@Query() params: QueryParams) {
    try {
      return await this.postService.getProfile(params);
    } catch (error) {
      throw error;
    }
  }

  @Post('interest')
  async interest(@Body() dto: string[], @Query() params: QueryParams) {
    try {
      return await this.postService.interest(dto, params);
    } catch (error) {
      throw error;
    }
  }
}

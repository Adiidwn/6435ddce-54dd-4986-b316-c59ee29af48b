import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { AboutDto } from 'src/dto/about.dto';
import { QueryParams } from 'src/dto/request.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly postService: ProfileService) {}

  @Post()
  async create(
    @Body() aboutDto: AboutDto,
    @Query() params: QueryParams,
    @Headers() token: string,
  ) {
    try {
      return await this.postService.createProfile(aboutDto, params, token);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getProfile(@Query() params: QueryParams, @Headers() token: string) {
    return await this.postService.getProfile(params, token);
  }

  @Post('interest')
  async interest(
    @Body() dto: string[],
    @Query() params: QueryParams,
    @Headers() token: string,
  ) {
    try {
      return await this.postService.interest(dto, params, token);
    } catch (error) {
      throw error;
    }
  }
}

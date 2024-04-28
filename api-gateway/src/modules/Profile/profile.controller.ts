import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AboutDto } from 'src/dto/about.dto';
import { QueryParams } from 'src/dto/request.dto';
import { ProfileService } from './profile.service';
import { Request } from 'express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly postService: ProfileService) {}

  @Post()
  async create(
    @Body() aboutDto: AboutDto,
    @Query() params: QueryParams,
    @Req() req: Request,
  ) {
    try {
      return await this.postService.createProfile(aboutDto, params, req);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getProfile(@Query() params: QueryParams, @Req() req: Request) {
    return await this.postService.getProfile(params, req);
  }

  @Post('interest')
  async interest(
    @Body() dto: string[],
    @Query() params: QueryParams,
    @Req() req: Request,
  ) {
    try {
      return await this.postService.interest(dto, params, req);
    } catch (error) {
      throw error;
    }
  }
}

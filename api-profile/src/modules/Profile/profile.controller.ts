import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AboutDto, updateProfile } from 'src/dto/about.dto';
import { QueryParams } from 'src/dto/request.dto';
import { SUCCESS_STATUS } from 'src/utils/response.constant';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly postService: ProfileService) {}

  @Post()
  async create(@Body() aboutDto: AboutDto, @Query() params: QueryParams) {
    try {
      const createProfile = await this.postService.createProfile(
        aboutDto,
        params,
      );
      return {
        createProfile,
        _meta: {
          code: HttpStatus.OK,
          status: SUCCESS_STATUS,
          message: 'success create profile',
        },
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getProfile(@Query() params: QueryParams) {
    try {
      const { total_data, datas } = await this.postService.getProfile(params);
      const meta_data = {
        total_count: total_data,
        page_count: Math.ceil(total_data / (params.per_page ?? 10)),
        page: params.page,
        per_page: params.per_page ?? 10,
        sort: params.sort,
        order_by: params.order_by,
        keyword: params.keyword,
      };
      return {
        data: datas,
        metadata: meta_data ? meta_data : null,
        _meta: {
          code: HttpStatus.OK,
          status: SUCCESS_STATUS,
          message: 'success get profile',
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // @Patch('updateProfile')
  // async updateProfile(@Body() updateDto: updateProfile, @Req() req: Request) {
  //   try {
  //     const data = await this.postService.updateProfile(updateDto, req);

  //     return {
  //       data: data,
  //       _meta: {
  //         code: HttpStatus.OK,
  //         status: SUCCESS_STATUS,
  //         message: 'success update profile',
  //       },
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Post('interest')
  async interest(@Body() dto: string[], @Query() params: QueryParams) {
    try {
      console.log('dto', dto);

      const data = await this.postService.interest(dto, params);
      return {
        data: data,
        _meta: {
          code: HttpStatus.OK,
          status: SUCCESS_STATUS,
          message: 'success create interest',
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

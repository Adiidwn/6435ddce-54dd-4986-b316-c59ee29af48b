import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
import { AuthGuard } from '../auth/auth.guard';
import { ProfileService } from './profile.service';

@Controller('api/v1/profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly postService: ProfileService) {}

  @Post()
  async create(@Body() aboutDto: AboutDto, @Req() req: Request) {
    try {
      const createProfile = await this.postService.createProfile(aboutDto, req);
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
      const { total_data, data } = await this.postService.getProfile(params);
      const meta_data = {
        total_count: total_data,
        page_count: Math.ceil(total_data / (params.per_page ?? 10)),
        page: params.page,
        per_page: params.per_page,
        sort: params.sort,
        order_by: params.order_by,
        keyword: params.keyword,
      };
      return {
        data: data,
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

  @Patch('updateProfile')
  async updateProfile(@Body() updateDto: updateProfile, @Req() req: Request) {
    try {
      const data = await this.postService.updateProfile(updateDto, req);

      return {
        data: data,
        _meta: {
          code: HttpStatus.OK,
          status: SUCCESS_STATUS,
          message: 'success update profile',
        },
      };
    } catch (error) {
      throw error;
    }
  }
  // @UseGuards(AuthGuard, RolesGuard)
  // @Delete('/post/:id')
  // @Roles(Role.ADMIN)
  // async deletePost(
  //   @Param('id') id: string,
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const deletePost = await this.postService.deletePost(id, req);
  //     return res.status(HttpStatus.OK).json({
  //       statusCode: HttpStatus.OK,
  //       data: deletePost,
  //     });
  //   } catch (error) {}
  // }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AboutDto, updateProfile } from 'src/dto/about.dto';
import { Roles } from 'src/guards/roles/roles.decorator';
import { Role } from 'src/guards/roles/roles.enum';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { ProfileService } from './profile.service';
import { SUCCESS_STATUS } from 'src/utils/response.constant';
import { QueryParams } from 'src/dto/request.dto';

@Controller('api')
export class ProfileController {
  constructor(private readonly postService: ProfileService) {}

  @Post('/createProfile')
  @UseGuards(AuthGuard)
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

  @Get('getProfile')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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

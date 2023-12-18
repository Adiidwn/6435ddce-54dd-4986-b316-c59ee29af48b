import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostDto } from 'src/dto/post.dto';
import { Roles } from 'src/guards/roles/roles.decorator';
import { PostService } from './post.service';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Role } from 'src/guards/roles/roles.enum';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  async create(
    @Body() postDto: PostDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const post = await this.postService.createPost(postDto, req);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: post,
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete('/post/:id')
  @Roles(Role.ADMIN)
  async deletePost(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const deletePost = await this.postService.deletePost(id, req);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: deletePost,
      });
    } catch (error) {}
  }
}

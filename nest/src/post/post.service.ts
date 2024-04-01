import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';
import { PostDto } from '../dto/post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(postDto: PostDto, req: Request): Promise<Post> {
    const user = req['user'];
    if (!user) {
      throw new Error('Unauthorized');
    }
    const { title, content } = postDto;

    const post = await this.prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
    });

    return post;
  }

  async deletePost(id: string, req: Request): Promise<Post> {
    const user = req['user'];
    console.log('user con post', user);

    if (!user) {
      throw new Error('Unauthorized');
    }
    return this.prisma.post.delete({
      where: { id },
    });
  }
}

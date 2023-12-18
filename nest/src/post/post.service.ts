import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PostDto } from '../dto/post.dto';
import { Request } from 'express';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  // async post(
  //   postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  // ): Promise<Post | null> {
  //   return this.prisma.post.findUnique({
  //     where: postWhereUniqueInput,
  //   });
  // }

  // async posts(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.PostWhereUniqueInput;
  //   where?: Prisma.PostWhereInput;
  //   orderBy?: Prisma.PostOrderByWithRelationInput;
  // }): Promise<Post[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.post.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }

  async createPost(postDto: PostDto, req: Request): Promise<Post> {
    const user = req["user"]
    if (!user) {
      throw new Error('Unauthorized');
    }
    const { title, content } = postDto;
    
    const post = await this.prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id
      },
     
    });
   
    return post;
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(id: string, req: Request): Promise<Post> {
    const user = req['user'];
    console.log("user con post", user);
    
    if (!user) {
      throw new Error('Unauthorized');
    }
    return this.prisma.post.delete({
      where: { id },
    });
  }
}

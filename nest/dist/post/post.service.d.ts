import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PostDto } from '../dto/post.dto';
import { Request } from 'express';
export declare class PostService {
    private prisma;
    constructor(prisma: PrismaService);
    createPost(postDto: PostDto, req: Request): Promise<Post>;
    updatePost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
    }): Promise<Post>;
    deletePost(id: string, req: Request): Promise<Post>;
}

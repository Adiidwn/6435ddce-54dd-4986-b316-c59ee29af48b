import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';
import { PostDto } from '../dto/post.dto';
import { Post } from '@prisma/client';
export declare class PostService {
    private prisma;
    constructor(prisma: PrismaService);
    createPost(postDto: PostDto, req: Request): Promise<Post>;
    deletePost(id: string, req: Request): Promise<Post>;
}

import { PostDto } from 'src/dto/post.dto';
import { PostService } from './post.service';
import { Request, Response } from 'express';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(postDto: PostDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deletePost(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}

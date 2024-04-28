import { AboutDto } from 'src/dto/about.dto';
import { QueryParams } from 'src/dto/request.dto';
import { ProfileService } from './profile.service';
import { Request } from 'express';
export declare class ProfileController {
    private readonly postService;
    constructor(postService: ProfileService);
    create(aboutDto: AboutDto, params: QueryParams, req: Request): Promise<any>;
    getProfile(params: QueryParams, req: Request): Promise<any>;
    interest(dto: string[], params: QueryParams, req: Request): Promise<any>;
}

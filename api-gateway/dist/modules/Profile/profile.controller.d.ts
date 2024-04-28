import { AboutDto } from 'src/dto/about.dto';
import { QueryParams } from 'src/dto/request.dto';
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly postService;
    constructor(postService: ProfileService);
    create(aboutDto: AboutDto, params: QueryParams, token: string): Promise<any>;
    getProfile(params: QueryParams, token: string): Promise<any>;
    interest(dto: string[], params: QueryParams, token: string): Promise<any>;
}

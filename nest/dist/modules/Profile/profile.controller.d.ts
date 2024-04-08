import { HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AboutDto, updateProfile } from 'src/dto/about.dto';
import { QueryParams } from 'src/dto/request.dto';
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly postService;
    constructor(postService: ProfileService);
    create(aboutDto: AboutDto, req: Request): Promise<{
        createProfile: {
            id: string;
            display_name: string;
            gender: string;
            birthday: Date;
            horoscope: string;
            zodiac: string;
            height: number;
            weight: number;
            authorId: string;
            ceatedAt: Date;
        };
        _meta: {
            code: HttpStatus;
            status: string;
            message: string;
        };
    }>;
    getProfile(params: QueryParams): Promise<{
        data: {
            display_name: string;
            gender: string;
            birthday: Date;
            horoscope: string;
            zodiac: string;
            height: number;
            weight: number;
            authorId: string;
        }[];
        metadata: {
            total_count: number;
            page_count: number;
            page: number;
            per_page: number;
            sort: import("src/utils/response.constant").SortOrder;
            order_by: string;
            keyword: string;
        };
        _meta: {
            code: HttpStatus;
            status: string;
            message: string;
        };
    }>;
    updateProfile(updateDto: updateProfile, req: Request): Promise<{
        data: {
            id: string;
            display_name: string;
            gender: string;
            birthday: Date;
            horoscope: string;
            zodiac: string;
            height: number;
            weight: number;
            authorId: string;
            ceatedAt: Date;
        };
        _meta: {
            code: HttpStatus;
            status: string;
            message: string;
        };
    }>;
}

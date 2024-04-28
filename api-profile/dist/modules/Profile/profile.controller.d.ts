import { HttpStatus } from '@nestjs/common';
import { AboutDto } from 'src/dto/about.dto';
import { QueryParams } from 'src/dto/request.dto';
import { ProfileService } from './profile.service';
import { Request } from 'express';
export declare class ProfileController {
    private readonly postService;
    constructor(postService: ProfileService);
    create(aboutDto: AboutDto, params: QueryParams, req: Request): Promise<{
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
            image: string;
            interest: import(".prisma/client").Prisma.JsonValue;
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
            birthday: string;
            age: number;
            horoscope: string;
            zodiac: string;
            height: string;
            weight: string;
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
    interest(dto: string[], params: QueryParams, req: Request): Promise<{
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
            image: string;
            interest: import(".prisma/client").Prisma.JsonValue;
            ceatedAt: Date;
        };
        _meta: {
            code: HttpStatus;
            status: string;
            message: string;
        };
    }>;
}

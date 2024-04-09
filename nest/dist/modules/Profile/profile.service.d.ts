import { Request } from 'express';
import { AboutDto, updateProfile } from 'src/dto/about.dto';
import { QueryParams } from 'src/dto/request.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    createProfile(aboutDto: AboutDto, req: Request): Promise<{
        id: string;
        display_name: string;
        gender: string;
        birthday: Date;
        horoscope: string;
        zodiac: string;
        height: number;
        weight: number;
        authorId: string;
        interest: import(".prisma/client").Prisma.JsonValue;
        ceatedAt: Date;
    }>;
    getProfile(params: QueryParams): Promise<{
        total_data: number;
        datas: {
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
    }>;
    updateProfile(updateDto: updateProfile, req: Request): Promise<{
        id: string;
        display_name: string;
        gender: string;
        birthday: Date;
        horoscope: string;
        zodiac: string;
        height: number;
        weight: number;
        authorId: string;
        interest: import(".prisma/client").Prisma.JsonValue;
        ceatedAt: Date;
    }>;
    interest(dto: string[], req: Request): Promise<{
        id: string;
        display_name: string;
        gender: string;
        birthday: Date;
        horoscope: string;
        zodiac: string;
        height: number;
        weight: number;
        authorId: string;
        interest: import(".prisma/client").Prisma.JsonValue;
        ceatedAt: Date;
    }>;
}

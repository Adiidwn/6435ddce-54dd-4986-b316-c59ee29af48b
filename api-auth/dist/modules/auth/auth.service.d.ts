import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { Request, Response } from 'express';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { QueryParams } from 'src/dto/request.dto';
import { PrismaService } from 'src/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: AuthRegisterDto): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        ceatedAt: Date;
        chat_id: string;
    }>;
    findAll(params: QueryParams): Promise<{
        datas: {
            id: string;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
            ceatedAt: Date;
            chat_id: string;
        }[];
        total_data: number;
    }>;
    login(authLoginDto: AuthLoginDto, res: Response): Promise<Response<any, Record<string, any>> | {
        payload: {
            id: string;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        access_token: string;
    }>;
    authCheck(params: QueryParams, req: Request): Promise<{
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    logout(req: Request, res: Response): Promise<{
        id: string;
        token: string;
        expiresAt: Date;
    }>;
    updateUser(updateDTO: AuthRegisterDto, params: QueryParams, req: Request): Promise<User>;
    deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User>;
}

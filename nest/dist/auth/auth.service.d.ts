import { HttpStatus } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { Request, Response } from 'express';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: AuthRegisterDto): Promise<User>;
    findUser(email: string): Promise<User | null>;
    login(authLoginDto: AuthLoginDto): Promise<{
        user: any;
        access_token: string;
        payload?: undefined;
    } | {
        payload: {
            id: string;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        access_token: string;
        user?: undefined;
    }>;
    authCheck(req: Request): Promise<{
        name: string;
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    logout(req: Request, res: Response): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    updateUser(authDto: AuthRegisterDto, id: string, req: Request): Promise<User>;
    deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User>;
}

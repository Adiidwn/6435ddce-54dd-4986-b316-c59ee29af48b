import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { QueryParams } from 'src/dto/request.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(authRegisterDto: AuthRegisterDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(authLoginDto: AuthLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: Request, res: Response, token: string): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response, params: QueryParams, token: string): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response, token: string): Promise<Response<any, Record<string, any>>>;
    updateUser(authDto: AuthRegisterDto, params: QueryParams, req: Request): Promise<{
        data: any;
        statusCode: HttpStatus;
    }>;
}

import { Request, Response } from 'express';
import { AuthLoginDto, AuthRegisterDto, AuthUpdateDto } from 'src/dto/auth.dto';
import { QueryParams } from 'src/dto/request.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(authLoginDto: AuthLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    register(authRegisterDto: AuthRegisterDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: Request, res: Response, params: QueryParams): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response, params: QueryParams): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUser(authDto: AuthUpdateDto, params: QueryParams, req: Request): Promise<any>;
}

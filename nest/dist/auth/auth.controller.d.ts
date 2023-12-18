import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(authLoginDto: AuthLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    register(authRegisterDto: AuthRegisterDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUser(authDto: AuthRegisterDto, id: string, req: Request): Promise<any>;
}

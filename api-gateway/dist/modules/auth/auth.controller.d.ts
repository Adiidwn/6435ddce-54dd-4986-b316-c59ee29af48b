import { Response } from 'express';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { QueryParams } from 'src/dto/request.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(authRegisterDto: AuthRegisterDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(authLoginDto: AuthLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response, params: QueryParams, token: string): Promise<Response<any, Record<string, any>>>;
}

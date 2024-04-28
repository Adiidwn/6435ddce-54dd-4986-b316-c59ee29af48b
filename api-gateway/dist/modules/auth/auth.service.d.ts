import { HttpService } from '@nestjs/axios';
import { AuthRegisterDto } from 'src/dto/auth.dto';
import { QueryParams } from 'src/dto/request.dto';
export declare class AuthService {
    private readonly httpService;
    constructor(httpService: HttpService);
    register(registerDto: any): Promise<any>;
    findAll(params: any, token: string): Promise<any>;
    login(authLoginDto: any): Promise<any>;
    authCheck(req: any, token: string): Promise<any>;
    logout(req: any): Promise<any>;
    updateUser(updateDTO: AuthRegisterDto, params: QueryParams, req: any): Promise<any>;
}

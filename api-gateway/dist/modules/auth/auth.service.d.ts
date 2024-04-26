import { HttpService } from '@nestjs/axios';
export declare class AuthService {
    private readonly httpService;
    constructor(httpService: HttpService);
    register(registerDto: any): Promise<any>;
    findAll(params: any, token: string): Promise<any>;
    login(authLoginDto: any): Promise<any>;
    authCheck(token: string): Promise<any>;
}

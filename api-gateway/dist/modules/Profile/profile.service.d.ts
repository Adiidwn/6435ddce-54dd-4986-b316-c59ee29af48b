import { HttpService } from '@nestjs/axios';
export declare class ProfileService {
    private httpService;
    constructor(httpService: HttpService);
    createProfile(aboutDto: any, params: any, token: string): Promise<any>;
    getProfile(params: any, token: string): Promise<any>;
    interest(dto: any, params: any, token: string): Promise<any>;
}

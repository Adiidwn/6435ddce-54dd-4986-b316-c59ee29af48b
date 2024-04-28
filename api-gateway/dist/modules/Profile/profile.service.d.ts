import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
export declare class ProfileService {
    private httpService;
    constructor(httpService: HttpService);
    createProfile(aboutDto: any, params: any, req: Request): Promise<any>;
    getProfile(params: any, req: Request): Promise<any>;
    interest(dto: any, params: any, req: Request): Promise<any>;
}

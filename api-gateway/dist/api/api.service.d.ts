import { HttpService } from '@nestjs/axios';
export declare class ApiService {
    private readonly httpService;
    constructor(httpService: HttpService);
    post(url: string, data: any): Promise<any>;
    catch(error: any): void;
    get(url: string): Promise<any>;
}

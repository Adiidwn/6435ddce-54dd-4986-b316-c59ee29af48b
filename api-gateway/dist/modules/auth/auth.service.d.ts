import { HttpService } from '@nestjs/axios';
import { AuthRegisterDto } from 'src/dto/auth.dto';
export declare class AuthService {
    private readonly http;
    constructor(http: HttpService);
    register(registerDto: AuthRegisterDto): Promise<import("rxjs").Observable<import("axios").AxiosResponse<any, any>>>;
}

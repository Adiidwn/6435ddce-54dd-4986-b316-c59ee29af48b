import { Response } from 'express';
import { AuthRegisterDto } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(authRegisterDto: AuthRegisterDto, res: Response): Promise<import("rxjs").Observable<import("axios").AxiosResponse<any, any>>>;
}

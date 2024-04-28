import { HttpService } from '@nestjs/axios';
import { QueryParams } from 'src/dto';
import { LoginLembagaDto } from 'src/dto/lembaga.dto';
export declare class DashboardLembagaService {
    private readonly httpService;
    constructor(httpService: HttpService);
    login(body: LoginLembagaDto): Promise<import("rxjs").Observable<any>>;
    findListSiswa(lembaga_id: number, params: QueryParams): Promise<import("rxjs").Observable<any>>;
    getDaftarSiswaLembaga(id_bimker: number, params: QueryParams): Promise<import("rxjs").Observable<any>>;
    findListTobk(lembaga_id: number, params: QueryParams): Promise<import("rxjs").Observable<any>>;
}

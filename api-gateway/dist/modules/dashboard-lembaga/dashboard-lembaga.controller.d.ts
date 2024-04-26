import { DashboardLembagaService } from './dashboard-lembaga.service';
import { QueryParams } from 'src/dto/request.dto';
export declare class DashboardLembagaController {
    private readonly dashboardLembagaService;
    constructor(dashboardLembagaService: DashboardLembagaService);
    login(body: any): Promise<import("rxjs").Observable<any>>;
    getJumlahSiswa(lembaga_id: string, params: QueryParams): Promise<import("rxjs").Observable<any>>;
    getDaftarSiswaLembaga(id_bimker: string, params: QueryParams): Promise<import("rxjs").Observable<any>>;
    getListTobk(lembaga_id: string, params: QueryParams): Promise<import("rxjs").Observable<any>>;
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DashboardLembagaService } from './dashboard-lembaga.service';
import { QueryParams } from 'src/dto/request.dto';

@Controller('dashboard-lembaga')
export class DashboardLembagaController {
  constructor(
    private readonly dashboardLembagaService: DashboardLembagaService,
  ) {}

  @Post()
  async login(@Body() body: any) {
    return this.dashboardLembagaService.login(body);
  }

  @Get('list-siswa/:id_lembaga')
  async getJumlahSiswa(
    @Param('id_lembaga') lembaga_id: string,
    @Query() params: QueryParams,
  ) {
    return this.dashboardLembagaService.findListSiswa(+lembaga_id, params);
  }

  @Get('daftar-siswa/:id_bimker')
  async getDaftarSiswaLembaga(
    @Param('id_bimker') id_bimker: string,
    @Query() params: QueryParams,
  ) {
    return this.dashboardLembagaService.getDaftarSiswaLembaga(
      +id_bimker,
      params,
    );
  }

  @Get('list-tobk/:id_lembaga')
  async getListTobk(
    @Param('id_lembaga') lembaga_id: string,
    @Query() params: QueryParams,
  ) {
    return this.dashboardLembagaService.findListTobk(+lembaga_id, params);
  }
}

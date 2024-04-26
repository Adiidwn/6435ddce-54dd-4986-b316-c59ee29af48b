import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { ApiService } from 'src/api/api.service';
import { QueryParams } from 'src/dto/request.dto';

@Injectable()
export class DashboardLembagaService {
  constructor(private readonly httpService: HttpService) {}

  async login(body: any) {
    try {
      const resp = this.httpService
        .post(
          `${process.env.SVC_DB_USER}/api/v1/new-dashboard-lembaga/login`,
          body,
        )
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        );

      return resp;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }

  async findListSiswa(lembaga_id: number, params: QueryParams) {
    try {
      const resp = this.httpService
        .get(
          `${process.env.SVC_DB_USER}/api/v1/new-dashboard-lembaga/list-siswa/${lembaga_id}`,
          {
            params,
          },
        )
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        );

      return resp;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }
  async getDaftarSiswaLembaga(id_bimker: number, params: QueryParams) {
    try {
      const resp = this.httpService
        .get(
          `${process.env.SVC_DB_USER}/api/v1/new-dashboard-lembaga/daftar-siswa/${id_bimker}`,
          {
            params,
          },
        )
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        );

      return resp;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }

  async findListTobk(lembaga_id: number, params: QueryParams) {
    try {
      const resp = this.httpService
        .get(
          `${process.env.SVC_DB_USER}/api/v1/new-dashboard-lembaga/list-tobk/${lembaga_id}`,
          {
            params,
          },
        )
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        );

      return resp;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }
}

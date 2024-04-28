import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { AuthUpdateDto } from 'src/dto/auth.dto';
import { QueryParams } from 'src/dto/request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async register(registerDto: any) {
    try {
      const data = await this.httpService
        .post(`${process.env.SVC_DB_AUTH}/api/v1/auth/register`, registerDto)
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        )
        .toPromise();
      return data;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }

  async findAll(params: any, token: string) {
    try {
      const data = this.httpService
        .get(`${process.env.SVC_DB_AUTH}/api/v1/auth?userId=${params}`, {
          params,
          headers: {
            Authorization: `Bearer ${token}`, // Include bearer token in the headers
          },
        })
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        )
        .toPromise();
      return data;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }

  async login(authLoginDto: any) {
    try {
      const data = await this.httpService
        .post(`${process.env.SVC_DB_AUTH}/api/v1/auth/login`, authLoginDto)
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        )
        .toPromise();
      return data;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }

  async authCheck(req: any, token: string) {
    try {
      const tokenn = req.headers.authorization?.split(' ')[1];

      const data = await this.httpService
        .get(`${process.env.SVC_DB_AUTH}/api/v1/auth/getProfile`, {
          headers: {
            Authorization: `Bearer ${tokenn}`, // Include bearer token in the headers
          },
        })
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        )
        .toPromise();
      return data;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }

  async logout(req: any) {
    try {
      const tokenn = req.headers.authorization?.split(' ')[1];

      const data = await this.httpService
        .post(`${process.env.SVC_DB_AUTH}/api/v1/auth/logout`, tokenn, {
          headers: {
            Authorization: `Bearer ${tokenn}`, // Include bearer token in the headers
          },
        })
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        )
        .toPromise();
      return data;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }

  async updateUser(updateDTO: AuthUpdateDto, params: QueryParams, req: any) {
    try {
      const tokenn = req.headers.authorization?.split(' ')[1];

      const data = await this.httpService
        .post(`${process.env.SVC_DB_AUTH}/api/v1/auth/update`, updateDTO, {
          params: params,
          headers: {
            Authorization: `Bearer ${tokenn}`, // Include bearer token in the headers
          },
        })
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        )
        .toPromise();
      return data;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }

  // async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  //   return this.prisma.user.delete({ where });
  // }
}

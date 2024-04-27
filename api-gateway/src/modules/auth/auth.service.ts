import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';

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
      throw error;
    }
  }

  async findAll(params: any, token: string) {
    try {
      const data = this.httpService
        .get(`${process.env.SVC_DB_AUTH}/api/v1/auth`, {
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
        .post(`http://localhost:3000/api/v1/auth/login`, authLoginDto)
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
      throw error;
    }
  }

  async authCheck(token: string) {
    try {
      const data = await this.httpService
        .get(`${process.env.SVC_DB_AUTH}/api/v1/auth/getProfile`, {
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

  // async logout(req: Request, res: Response) {
  //   const blackListToken = await this.prisma.blacklistedToken.create({
  //     data: {
  //       token: req.header('Authorization').replace('Bearer ', ''),
  //       expiresAt: new Date(),
  //     },
  //   });

  //   return {
  //     statusCode: HttpStatus.OK,
  //     acess_token: blackListToken,
  //     message: 'Logout successful',
  //   };
  // }

  // async updateUser(
  //   updateDTO: AuthRegisterDto,
  //   params: QueryParams,
  //   req: Request,
  // ): Promise<User> {
  //   const user = req['user'];

  //   if (user.id !== params.user_id) {
  //     throw new UnauthorizedException('unknown user');
  //   }

  //   const arrQuery = [];
  //   if (params.user_id) {
  //     arrQuery.push({
  //       id: params.user_id,
  //     });
  //   }

  //   if (!user) {
  //     throw new UnauthorizedException('unknown user');
  //   }
  //   const userData = await this.prisma.user.findFirst({
  //     where: {
  //       AND: arrQuery,
  //     },
  //   });

  //   userData.name = updateDTO.name;
  //   userData.email = updateDTO.email;
  //   userData.password = updateDTO.password;

  //   return this.prisma.user.update({
  //     where: { id: user.id },
  //     data: userData,
  //   });
  // }

  // async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  //   return this.prisma.user.delete({ where });
  // }
}

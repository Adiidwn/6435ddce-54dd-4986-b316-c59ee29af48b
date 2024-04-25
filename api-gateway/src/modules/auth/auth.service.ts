import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from 'src/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async register(registerDto: AuthRegisterDto) {
    try {
      const data = await this.http.post(
        `${process.env.SVC_DB_AUTH}/api/v1/auth/register`,
        {
          registerDto,
        },
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  // async findAll(params: QueryParams) {
  //   let QueryArr = [];

  //   const skip = params.per_page * (params.page - 1);
  //   const take = params.per_page;

  //   if (params.username) {
  //     QueryArr.push({
  //       name: {
  //         contains: params.username,
  //       },
  //     });
  //   }

  //   const [total_data, datas] = await this.prisma.$transaction([
  //     this.prisma.user.count({
  //       where: {
  //         AND: QueryArr,
  //       },
  //     }),
  //     this.prisma.user.findMany({
  //       where: {
  //         AND: QueryArr,
  //       },
  //       select: {
  //         id: true,
  //         name: true,
  //         email: true,
  //         role: true,
  //         ceatedAt: true,
  //         chat_id: true,
  //       },
  //       take,
  //       orderBy: {
  //         id: params.sort,
  //       },
  //     }),
  //   ]);

  //   return {
  //     datas,
  //     total_data,
  //   };
  // }

  // async login(authLoginDto: AuthLoginDto) {
  //   try {
  //     const checkEmail = await this.prisma.user.findFirst({
  //       where: {
  //         email: authLoginDto.email,
  //       },
  //     });

  //     if (!checkEmail) {
  //       return {
  //         user: null,
  //         access_token: 'Error Email / password is wrong',
  //       };
  //     }
  //     console.log('checkEmail', checkEmail);

  //     const passwordMatch = await bcrypt.compare(
  //       authLoginDto.password,
  //       checkEmail.password,
  //     );
  //     console.log('passwordMatch', passwordMatch);

  //     if (!passwordMatch) {
  //       throw new Error('Invalid email or password');
  //     }

  //     const payload = {
  //       id: checkEmail.id,
  //       email: checkEmail.email.split('@')[0],
  //       name: checkEmail.name,
  //       role: checkEmail.role,
  //     };

  //     const token = await this.jwtService.signAsync(
  //       { payload },
  //       { expiresIn: '10000000h' },
  //     );
  //     return {
  //       payload,
  //       access_token: token,
  //     };
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // async authCheck(req: Request) {
  //   try {
  //     const loginSession = req['user'];
  //     const user = await this.prisma.user.findFirst({
  //       where: {
  //         id: loginSession.id,
  //       },
  //       select: {
  //         id: true,
  //         email: true,
  //         name: true,
  //         role: true,
  //       },
  //     });

  //     return user;
  //   } catch (error) {
  //     return null;
  //   }
  // }

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

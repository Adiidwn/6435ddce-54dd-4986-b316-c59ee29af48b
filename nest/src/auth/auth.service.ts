import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

interface loginData {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: AuthRegisterDto): Promise<User> {
    const { name, email, password } = registerDto;
    const saltRounds = 10;
    const bcryptPassword = await bcrypt.hash(password, saltRounds);

    const user = await this.prisma.user.create({
      data: {
        role: 'user',
        name,
        email,
        password: bcryptPassword,
      },
    });
    if (!user) {
      throw new Error('Failed to create user');
    }
    return user;
  }

  async findUser(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async login(authLoginDto: AuthLoginDto) {
    try {
      const { email, password } = authLoginDto;
      const checkEmail = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!checkEmail) {
        return {
          user: null,
          access_token: 'Error Email / password is wrong',
        };
      }

      const passwordMatch = await bcrypt.compare(password, checkEmail.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }
      const payload = {
        id: checkEmail.id,
        email: checkEmail.email,
        name: checkEmail.name,
        role: checkEmail.role,
      };

      const token = await this.jwtService.signAsync(payload);
      return {
        payload,
        access_token: token,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async authCheck(req: Request) {
    try {
      const loginSession = req['user'];
      const user = await this.prisma.user.findFirst({
        where: {
          id: loginSession.id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      return user;
    } catch (error) {
      return null;
    }
  }

//   async logout(req: Request) {
//     const loginSession = req['user'];
//     loginSession.destroy();
//     return {
//       statusCode: HttpStatus.OK,
//       message: 'Logout successfully',
//     };
//   }

  //   async updateUser(params: {
  //     where: Prisma.UserWhereUniqueInput;
  //     data: Prisma.UserUpdateInput;
  //   }): Promise<User> {
  //     const { where, data } = params;
  //     return this.prisma.user.update({
  //       data,
  //       where,
  //     });
  //   }

  //   async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  //     return this.prisma.user.delete({ where });
  //   }
}

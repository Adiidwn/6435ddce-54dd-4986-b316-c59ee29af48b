import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';
import { QueryParams } from 'src/dto/request.dto';

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
    console.log('registerDto', registerDto);

    const saltRounds = 10;
    const confirmPassword = registerDto.confirmPassword;
    if (confirmPassword !== password) {
      throw new Error('Passwords do not match');
    }
    const bcryptPassword = await bcrypt.hash(password, saltRounds);
    console.log('bcryptPassword', bcryptPassword);
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: bcryptPassword,
      },
    });
    console.log('user', user);

    if (!user) {
      throw new Error('Failed to create user');
    }
    return user;
  }

  async findUser(email: string, params: QueryParams): Promise<User | null> {
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
        email: checkEmail.email.split('@')[0],
        name: checkEmail.name,
        role: checkEmail.role,
      };

      const token = await this.jwtService.signAsync(
        { payload },
        { expiresIn: '10000000h' },
      );
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

  async logout(req: Request, res: Response) {
    const loginSession = req['user'];

    const expiration = new Date(Date.now() - 1000);

    const newToken = this.jwtService.sign(
      {
        id: loginSession.id,
        email: loginSession.email,
        name: loginSession.name,
        role: loginSession.role,
      },
      { expiresIn: '1s' },
    );

    res.header('Authorization', `Bearer ${newToken}`);

    return {
      statusCode: HttpStatus.OK,
      acess_token: newToken,
      message: 'Logout successful',
    };
  }

  async updateUser(
    updateDTO: AuthRegisterDto,
    params: QueryParams,
    req: Request,
  ): Promise<User> {
    const user = req['user'];

    if (user.id !== params.user_id) {
      throw new UnauthorizedException('unknown user');
    }

    const arrQuery = [];
    if (params.user_id) {
      arrQuery.push({
        id: params.user_id,
      });
    }

    if (!user) {
      throw new UnauthorizedException('unknown user');
    }
    const userData = await this.prisma.user.findFirst({
      where: {
        AND: arrQuery,
      },
    });

    userData.name = updateDTO.name;
    userData.email = updateDTO.email;
    userData.password = updateDTO.password;

    return this.prisma.user.update({
      where: { id: user.id },
      data: userData,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}

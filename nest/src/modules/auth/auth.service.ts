import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { QueryParams } from 'src/dto/request.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: AuthRegisterDto) {
    try {
      console.log('registerDto', registerDto);

      const saltRounds = 10;

      const checkEmail = await this.prisma.user.findFirst({
        where: {
          email: registerDto.email,
        },
      });
      if (checkEmail) {
        throw new Error('Email already exists');
      }
      console.log('asdasd');

      const bcryptPassword = await bcrypt.hash(
        registerDto.password,
        saltRounds,
      );
      console.log('bcryptPassword', bcryptPassword);
      const user = await this.prisma.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          password: bcryptPassword,
        },
      });
      console.log('user', user);

      if (!user) {
        throw new Error('Failed to create user');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUser(email: string, params: QueryParams): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async login(authLoginDto: AuthLoginDto) {
    try {
      const checkEmail = await this.prisma.user.findFirst({
        where: {
          email: authLoginDto.email,
        },
      });

      if (!checkEmail) {
        return {
          user: null,
          access_token: 'Error Email / password is wrong',
        };
      }
      console.log('checkEmail', checkEmail);

      const passwordMatch = await bcrypt.compare(
        authLoginDto.password,
        checkEmail.password,
      );
      console.log('passwordMatch', passwordMatch);

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
    const blackListToken = await this.prisma.blacklistedToken.create({
      data: {
        token: req.header('Authorization').replace('Bearer ', ''),
        expiresAt: new Date(),
      },
    });

    return {
      statusCode: HttpStatus.OK,
      acess_token: blackListToken,
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

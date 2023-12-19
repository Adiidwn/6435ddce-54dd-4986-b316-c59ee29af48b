import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';

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

  async logout(req: Request, res: Response) {
    const loginSession = req['user'];

    // Set expiration to a past date or a very short duration (e.g., 1 second)
    const expiration = new Date(Date.now() - 10000); // 1 second ago

    // Generate a new token with the updated expiration
    const newToken = this.jwtService.sign(
      {
        id: loginSession.id,
        email: loginSession.email,
        name: loginSession.name,
        role: loginSession.role,
      },
      { expiresIn: '1s' },
    ); // 1 second expiration

    // Set the new token in the response header (optional)
    res.header('Authorization', `Bearer ${newToken}`);

    // Respond with a successful logout message
    return {
      statusCode: HttpStatus.OK,
      message: 'Logout successful',
    };
  }

  async updateUser(
    authDto: AuthRegisterDto,
    id: string,
    req: Request,
  ): Promise<User> {
    const user = req['user'];
    const paramId = id;
    console.log("id", id);
    console.log("user", user);
    
    
    if (!user) {
      throw new UnauthorizedException('unknown user');
    }
    const userData = await this.prisma.user.findFirst({
      where: {
        id: paramId,
      },
    });

    userData.name = authDto.name;
    userData.email = authDto.email;
    userData.password = authDto.password;

      console.log("userDataa",userData);
      
    return this.prisma.user.update({
      where: { id: user.id },
      data: userData,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { QueryParams } from 'src/dto/request.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() authLoginDto: AuthLoginDto, @Res() res: Response) {
    const login = await this.authService.login(authLoginDto);
    if (!login) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: login,
    });
  }

  @Post('/register')
  async register(
    @Body() authRegisterDto: AuthRegisterDto,
    @Res() res: Response,
  ) {
    try {
      const register = await this.authService.register(authRegisterDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: register,
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get('/getProfile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('req user', req.headers['authorization'].split(' ')[1]);

      const authCheck = await this.authService.authCheck(req);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: authCheck,
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.authService.logout(req, res);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  }

  @UseGuards(AuthGuard)
  @Post('/updateUser')
  async updateUser(
    @Body() authDto: AuthRegisterDto,
    @Query() params: QueryParams,
    @Req() req: Request,
  ) {
    try {
      const user = req['user'];
      if (!user) {
        return 'Unauthorized';
      }
      const updateUser = await this.authService.updateUser(
        authDto,
        params,
        req,
      );
      console.log('updateUser controller:', updateUser);
      return updateUser;
    } catch (error) {
      return error;
    }
  }
}

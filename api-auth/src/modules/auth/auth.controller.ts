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
import { SUCCESS_STATUS } from 'src/utils/response.constant';

@Controller('auth')
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
      data: login,
      statusCode: HttpStatus.OK,
      message: 'Login successful',
    });
  }

  @Post('/register')
  async register(
    @Body() authRegisterDto: AuthRegisterDto,
    @Res() res: Response,
  ) {
    try {
      console.log('authRegisterDto', authRegisterDto);
      const register = await this.authService.register(authRegisterDto);

      return res.status(HttpStatus.OK).json({
        data: register,
        statusCode: HttpStatus.OK,
        message: 'User created successfully',
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }

  @Get('/getProfile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('req user', req.headers['authorization'].split(' ')[1]);

      const authCheck = await this.authService.authCheck(req);
      return res.status(HttpStatus.OK).json({
        data: authCheck,
        statusCode: HttpStatus.OK,
        message: 'User Get successfully',
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }

  @Get('/')
  async findAll(@Res() res: Response, @Query() params: QueryParams) {
    try {
      const { total_data, datas } = await this.authService.findAll(params);

      const meta_data = {
        total_count: total_data,
        page_count: Math.ceil(total_data / (params.per_page ?? 10)),
        page: params.page,
        per_page: params.per_page ?? 10,
        sort: params.sort,
        order_by: params.order_by,
        keyword: params.keyword,
      };

      return res.status(HttpStatus.OK).json({
        data: datas,
        metadata: meta_data ? meta_data : null,
        _meta: {
          code: HttpStatus.OK,
          status: SUCCESS_STATUS,
          message: 'success get profile',
        },
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.authService.logout(req, res);
      return res.status(HttpStatus.OK).json({
        data: result,
        statusCode: HttpStatus.OK,
        message: 'Logout successful',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  }

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
      return {
        data: updateUser,
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
      };
    } catch (error) {
      return error;
    }
  }
}

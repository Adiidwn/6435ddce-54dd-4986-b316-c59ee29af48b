import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { QueryParams } from 'src/dto/request.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(
    @Body() authRegisterDto: AuthRegisterDto,
    @Res() res: Response,
  ) {
    const data = await this.authService.register(authRegisterDto);

    return res.status(HttpStatus.OK).json(data);
  }

  @Post('/login')
  async login(@Body() authLoginDto: AuthLoginDto, @Res() res: Response) {
    const data = await this.authService.login(authLoginDto);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('/getProfile')
  async getProfile(
    @Req() req: Request,
    @Res() res: Response,
    @Headers() token: string,
  ) {
    const data = await this.authService.authCheck(req, token);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('/')
  async findAll(
    @Res() res: Response,
    @Query() params: QueryParams,
    @Headers() token: string,
  ) {
    const data = await this.authService.findAll(params, token);
    return res.status(HttpStatus.OK).json(data);
  }

  @Post('/logout')
  async logout(
    @Req() req: Request,
    @Res() res: Response,
    @Headers() token: string,
  ) {
    const data = await this.authService.logout(req);
    return res.status(HttpStatus.OK).json(data);
  }

  @Post('/updateUser')
  async updateUser(
    @Body() authDto: AuthRegisterDto,
    @Query() params: QueryParams,
    @Req() req: Request,
  ) {
    const data = await this.authService.updateUser(authDto, params, req);
    return {
      data,
      statusCode: HttpStatus.OK,
    };
  }
}

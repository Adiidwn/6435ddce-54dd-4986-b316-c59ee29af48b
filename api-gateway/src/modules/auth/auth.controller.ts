import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { QueryParams } from 'src/dto/request.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/login')
  // async login(@Body() authLoginDto: AuthLoginDto, @Res() res: Response) {
  //   return await this.authService.login(authLoginDto);
  // }

  @Post('/register')
  async register(
    @Body() authRegisterDto: AuthRegisterDto,
    @Res() res: Response,
  ) {
    return await this.authService.register(authRegisterDto);
  }

  // @Get('/getProfile')
  // async getProfile(@Req() req: Request, @Res() res: Response) {
  //   return await this.authService.authCheck(req);
  // }

  // @Get('/')
  // async findAll(@Res() res: Response, @Query() params: QueryParams) {
  //   return await this.authService.findAll(params);
  // }

  // @Post('/logout')
  // async logout(@Req() req: Request, @Res() res: Response) {
  //   return await this.authService.logout(req, res);
  // }

  // @Post('/updateUser')
  // async updateUser(
  //   @Body() authDto: AuthRegisterDto,
  //   @Query() params: QueryParams,
  //   @Req() req: Request,
  // ) {
  //   return await this.authService.updateUser(authDto, params, req);
  // }
}

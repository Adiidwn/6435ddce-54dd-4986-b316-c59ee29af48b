import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auths')
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
    console.log(login);
    
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

//   @Post('/logout')
//   async logout(@Req() req: Request, @Res() res: Response) {
//     try {
//       const logout = await this.authService.logout(req);
//       return res.status(HttpStatus.OK).json({
//         statusCode: HttpStatus.OK,
//         data: logout,
//       });
//     } catch (error) {
//       return res.status(HttpStatus.UNAUTHORIZED).json({
//         statusCode: HttpStatus.UNAUTHORIZED,
//         message: error.message,
//       });
//     }
//   }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    try {
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
}

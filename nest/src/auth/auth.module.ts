import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstants';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, RolesGuard, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}

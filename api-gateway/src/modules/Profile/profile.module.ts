import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpService],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
  exports: [ProfileService],
})
export class ProfileModule {}

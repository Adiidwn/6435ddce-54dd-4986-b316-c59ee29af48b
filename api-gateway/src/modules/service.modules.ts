import { Module } from '@nestjs/common';
import { ProfileModule } from './Profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ProfileModule, AuthModule, HttpModule],
})
export class ServiceModules {}

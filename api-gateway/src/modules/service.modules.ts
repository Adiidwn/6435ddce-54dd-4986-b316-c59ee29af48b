import { Module } from '@nestjs/common';
import { ProfileModule } from './Profile/profile.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProfileModule, AuthModule],
})
export class ServiceModules {}

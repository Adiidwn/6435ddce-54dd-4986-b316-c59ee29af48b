import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './Profile/profile.module';

@Module({
  imports: [AuthModule, ProfileModule],
})
export class AppModule {}

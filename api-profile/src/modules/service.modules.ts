import { Module } from '@nestjs/common';
import { ProfileModule } from './Profile/profile.module';

@Module({
  imports: [ProfileModule],
})
export class ServiceModules {}

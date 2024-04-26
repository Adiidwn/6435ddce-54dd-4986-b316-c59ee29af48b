import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ServiceModules } from './modules/service.modules';
import { ApiService } from './api/api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ServiceModules, ApiModule, HttpModule],
  providers: [ApiService],
})
export class AppModule {}

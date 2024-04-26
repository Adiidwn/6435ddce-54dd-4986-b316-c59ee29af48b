import { Module } from '@nestjs/common';
import { DashboardLembagaController } from './dashboard-lembaga.controller';
import { DashboardLembagaService } from './dashboard-lembaga.service';

@Module({
  controllers: [DashboardLembagaController],
  providers: [DashboardLembagaService],
})
export class DashboardLembagaModule {}

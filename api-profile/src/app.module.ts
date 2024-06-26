import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtMiddleware } from './middlewares/logout';
import { ServiceModules } from './modules/service.modules';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ServiceModules],
  providers: [JwtMiddleware, PrismaService],
})
export class AppModule {}

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: '/api/v1/auth/login', method: RequestMethod.POST },
        { path: '/api/v1/auth/register', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}

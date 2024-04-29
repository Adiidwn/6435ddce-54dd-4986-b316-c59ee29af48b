import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from '../auths/auth.guard';

@Module({
  imports: [],
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService, AuthGuard],
  exports: [MessagesService],
})
export class MessagesModule {}

import { Module } from '@nestjs/common';
import { ChatController } from './chats.controller';
import { ChatService } from './chats.service';
import { AuthGuard } from '../auths/auth.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService, AuthGuard, PrismaService],
  exports: [ChatService],
})
export class ChatModule {}

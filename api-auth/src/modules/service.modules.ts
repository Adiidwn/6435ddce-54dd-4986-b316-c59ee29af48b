import { Module } from '@nestjs/common';
import { AuthModule } from './auths/auth.module';
import { ChatModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [AuthModule, ChatModule, MessagesModule],
})
export class ServiceModules {}

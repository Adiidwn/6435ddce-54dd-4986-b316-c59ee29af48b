import { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './modules/messages/messages.service';
import { CreateMessageDto } from './dto/message.dto';
export declare class AppGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    server: Server;
    private logger;
    handleSendMessage(client: Socket, payload: CreateMessageDto): Promise<void>;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
}

import { CreateMessageDto } from 'src/dto/message.dto';
import { QueryParams } from 'src/dto/request.dto';
import { PrismaService } from 'src/prisma.service';
export declare class MessagesService {
    private readonly messagesRepository;
    constructor(messagesRepository: PrismaService);
    createMessage(createMessageDto: CreateMessageDto): Promise<{
        id: string;
        chat_id: string;
        sender_id: string;
        message: string;
    }>;
    findAllMessages(params: QueryParams): Promise<{
        id: string;
        chat_id: string;
        sender_id: string;
        message: string;
    }[]>;
}

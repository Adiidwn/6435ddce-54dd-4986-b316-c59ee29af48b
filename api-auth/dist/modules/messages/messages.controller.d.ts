import { MessagesService } from './messages.service';
import { CreateMessageDto } from 'src/dto/message.dto';
import { QueryParams } from 'src/dto/request.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    createMessage(createMessageDto: CreateMessageDto): Promise<{
        id: string;
        chat_id: string;
        sender_id: string;
        message: string;
    }>;
    getAllMessagesByChatId(params: QueryParams): Promise<{
        id: string;
        chat_id: string;
        sender_id: string;
        message: string;
    }[]>;
}

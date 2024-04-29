import { ChatService } from './chats.service';
import { CreateChatDto } from 'src/dto/chat.dto';
import { QueryParams } from 'src/dto/request.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    createChat(createChatDto: CreateChatDto): Promise<{
        data: {
            id: string;
            members: string[];
        };
        statusCode: number;
        message: string;
    }>;
    getAllChatsByUserId(params: QueryParams): Promise<{
        data: {
            id: string;
            members: string[];
        }[];
        statusCode: number;
        message: string;
    }>;
}

import { CreateChatDto } from 'src/dto/chat.dto';
import { QueryParams } from 'src/dto/request.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ChatService {
    private readonly chatRepository;
    constructor(chatRepository: PrismaService);
    createChat(createChatDto: CreateChatDto): Promise<{
        id: string;
        members: string[];
    }>;
    findAllChats(params: QueryParams): Promise<{
        id: string;
        members: string[];
    }[]>;
}

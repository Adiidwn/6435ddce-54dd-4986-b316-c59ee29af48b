import { Injectable } from '@nestjs/common';
import { CreateChatDto } from 'src/dto/chat.dto';
import { QueryParams } from 'src/dto/request.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: PrismaService) {}

  async createChat(createChatDto: CreateChatDto) {
    const createOne = await this.chatRepository.chat.create({
      data: createChatDto,
    });

    return createOne;
  }

  async findAllChats(params: QueryParams) {
    const findAll = await this.chatRepository.chat.findMany({
      where: {
        id: String(params.user_id),
      },
    });
    return findAll;
  }
}

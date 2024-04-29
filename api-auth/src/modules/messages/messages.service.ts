import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from 'src/dto/message.dto';
import { QueryParams } from 'src/dto/request.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: PrismaService) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const createOne = await this.messagesRepository.message.create({
      data: createMessageDto,
    });
    return createOne;
  }

  async findAllMessages(params: QueryParams) {
    const findAll = await this.messagesRepository.message.findMany({
      where: { chat_id: params.chat_id },
    });
    return findAll;
  }
}

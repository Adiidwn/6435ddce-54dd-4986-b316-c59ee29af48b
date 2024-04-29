import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateChatDto } from 'src/dto/chat.dto';
import { QueryParams } from 'src/dto/request.dto';
import { AuthGuard } from '../auths/auth.guard';
import { ChatService } from './chats.service';

@ApiTags('chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post('create-chat')
  @ApiResponse({
    status: 201,
    description: 'The chat has been successfully created.',
  })
  async createChat(@Body() createChatDto: CreateChatDto) {
    const create = await this.chatService.createChat(createChatDto);

    return {
      data: create,
      statusCode: 201,
      message: 'The chat has been successfully created.',
    };
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllChatsByUserId(@Query() params: QueryParams) {
    const data = await this.chatService.findAllChats(params);

    return {
      data,
      statusCode: 200,
      message: 'The chat has been successfully created.',
    };
  }
}

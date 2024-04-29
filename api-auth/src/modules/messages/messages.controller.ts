import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auths/auth.guard';
import { CreateMessageDto } from 'src/dto/message.dto';
import { QueryParams } from 'src/dto/request.dto';
@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @Post('create-message')
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully created.',
  })
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.createMessage(createMessageDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllMessagesByChatId(@Query() params: QueryParams) {
    return await this.messagesService.findAllMessages(params);
  }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auths/auth.guard");
const chats_service_1 = require("./chats.service");
const chat_dto_1 = require("../../dto/chat.dto");
const request_dto_1 = require("../../dto/request.dto");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async createChat(createChatDto) {
        const create = await this.chatService.createChat(createChatDto);
        return {
            data: create,
            statusCode: 201,
            message: 'The chat has been successfully created.',
        };
    }
    async getAllChatsByUserId(params) {
        const data = await this.chatService.findAllChats(params);
        return {
            data,
            statusCode: 200,
            message: 'The chat has been successfully created.',
        };
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create-chat'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The chat has been successfully created.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.CreateChatDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createChat", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.QueryParams]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getAllChatsByUserId", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)('chats'),
    (0, common_1.Controller)('chats'),
    __metadata("design:paramtypes", [chats_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chats.controller.js.map
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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_dto_1 = require("../../dto/auth.dto");
const request_dto_1 = require("../../dto/request.dto");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(authRegisterDto, res) {
        const data = await this.authService.register(authRegisterDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async login(authLoginDto, res) {
        const data = await this.authService.login(authLoginDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async getProfile(req, res, token) {
        const data = await this.authService.authCheck(req, token);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(res, params, token) {
        const data = await this.authService.findAll(params, token);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async logout(req, res, token) {
        const data = await this.authService.logout(req);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async updateUser(authDto, params, req) {
        return this.authService.updateUser(authDto, params, req);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthRegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/getProfile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.QueryParams, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthUpdateDto,
        request_dto_1.QueryParams, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUser", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
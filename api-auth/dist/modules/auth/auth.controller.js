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
const auth_dto_1 = require("../../dto/auth.dto");
const request_dto_1 = require("../../dto/request.dto");
const response_constant_1 = require("../../utils/response.constant");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(authLoginDto, res) {
        const login = await this.authService.login(authLoginDto, res);
        if (!login) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: 'Unauthorized',
            });
        }
        return res.status(common_1.HttpStatus.OK).json({
            data: login,
            statusCode: common_1.HttpStatus.OK,
            message: 'Login successful',
        });
    }
    async register(authRegisterDto, res) {
        try {
            console.log('authRegisterDto', authRegisterDto);
            const register = await this.authService.register(authRegisterDto);
            return res.status(common_1.HttpStatus.OK).json({
                data: register,
                statusCode: common_1.HttpStatus.OK,
                message: 'User created successfully',
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: error.message,
            });
        }
    }
    async getProfile(req, res, params) {
        try {
            const authCheck = await this.authService.authCheck(params, req);
            return res.status(common_1.HttpStatus.OK).json({
                data: authCheck,
                statusCode: common_1.HttpStatus.OK,
                message: 'User Get successfully',
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: error.message,
            });
        }
    }
    async findAll(res, params) {
        try {
            const { total_data, datas } = await this.authService.findAll(params);
            const meta_data = {
                total_count: total_data,
                page_count: Math.ceil(total_data / (params.per_page ?? 10)),
                page: params.page,
                per_page: params.per_page ?? 10,
                sort: params.sort,
                order_by: params.order_by,
                keyword: params.keyword,
            };
            return res.status(common_1.HttpStatus.OK).json({
                data: datas,
                metadata: meta_data ? meta_data : null,
                _meta: {
                    code: common_1.HttpStatus.OK,
                    status: response_constant_1.SUCCESS_STATUS,
                    message: 'success get profile',
                },
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: error.message,
            });
        }
    }
    async logout(req, res) {
        try {
            const result = await this.authService.logout(req, res);
            return res.status(common_1.HttpStatus.OK).json({
                data: result,
                statusCode: common_1.HttpStatus.OK,
                message: 'Logout successful',
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
            });
        }
    }
    async updateUser(authDto, params, req) {
        try {
            const user = req;
            console.log('user', user);
            console.log('reqUser', req['user']);
            if (!user) {
                return 'Unauthorized';
            }
            const updateUser = await this.authService.updateUser(authDto, params, req);
            console.log('updateUser controller:', updateUser);
            return {
                data: updateUser,
                statusCode: common_1.HttpStatus.OK,
                message: 'User updated successfully',
            };
        }
        catch (error) {
            return error;
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthRegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('/getProfile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, request_dto_1.QueryParams]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.QueryParams]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthRegisterDto,
        request_dto_1.QueryParams, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
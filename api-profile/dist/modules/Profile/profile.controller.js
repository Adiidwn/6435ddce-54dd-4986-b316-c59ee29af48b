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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const about_dto_1 = require("../../dto/about.dto");
const request_dto_1 = require("../../dto/request.dto");
const response_constant_1 = require("../../utils/response.constant");
const profile_service_1 = require("./profile.service");
let ProfileController = class ProfileController {
    constructor(postService) {
        this.postService = postService;
    }
    async create(aboutDto, params) {
        try {
            const createProfile = await this.postService.createProfile(aboutDto, params);
            return {
                createProfile,
                _meta: {
                    code: common_1.HttpStatus.OK,
                    status: response_constant_1.SUCCESS_STATUS,
                    message: 'success create profile',
                },
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getProfile(params) {
        try {
            const { total_data, datas } = await this.postService.getProfile(params);
            const meta_data = {
                total_count: total_data,
                page_count: Math.ceil(total_data / (params.per_page ?? 10)),
                page: params.page,
                per_page: params.per_page ?? 10,
                sort: params.sort,
                order_by: params.order_by,
                keyword: params.keyword,
            };
            return {
                data: datas,
                metadata: meta_data ? meta_data : null,
                _meta: {
                    code: common_1.HttpStatus.OK,
                    status: response_constant_1.SUCCESS_STATUS,
                    message: 'success get profile',
                },
            };
        }
        catch (error) {
            throw error;
        }
    }
    async interest(dto, params) {
        try {
            console.log('dto', dto);
            const data = await this.postService.interest(dto, params);
            return {
                data: data,
                _meta: {
                    code: common_1.HttpStatus.OK,
                    status: response_constant_1.SUCCESS_STATUS,
                    message: 'success create interest',
                },
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [about_dto_1.AboutDto, request_dto_1.QueryParams]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.QueryParams]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('interest'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, request_dto_1.QueryParams]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "interest", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map
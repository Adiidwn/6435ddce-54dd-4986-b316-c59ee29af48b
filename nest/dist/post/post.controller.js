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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_dto_1 = require("../dto/post.dto");
const roles_decorator_1 = require("../guards/roles/roles.decorator");
const post_service_1 = require("./post.service");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../guards/roles/roles.guard");
const roles_enum_1 = require("../guards/roles/roles.enum");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async create(postDto, req, res) {
        try {
            const post = await this.postService.createPost(postDto, req);
            return res.status(common_1.HttpStatus.OK).json({
                statusCode: common_1.HttpStatus.OK,
                data: post,
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: error.message,
            });
        }
    }
    async deletePost(id, req, res) {
        try {
            const deletePost = await this.postService.deletePost(id, req);
            return res.status(common_1.HttpStatus.OK).json({
                statusCode: common_1.HttpStatus.OK,
                data: deletePost,
            });
        }
        catch (error) { }
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.PostDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)('/post/:id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { name, email, password } = registerDto;
        const saltRounds = 10;
        const bcryptPassword = await bcrypt.hash(password, saltRounds);
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: bcryptPassword,
            },
        });
        if (!user) {
            throw new Error('Failed to create user');
        }
        return user;
    }
    async findUser(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async login(authLoginDto) {
        try {
            const { email, password } = authLoginDto;
            const checkEmail = await this.prisma.user.findFirst({
                where: {
                    email,
                },
            });
            if (!checkEmail) {
                return {
                    user: null,
                    access_token: 'Error Email / password is wrong',
                };
            }
            const passwordMatch = await bcrypt.compare(password, checkEmail.password);
            if (!passwordMatch) {
                throw new Error('Invalid email or password');
            }
            const payload = {
                id: checkEmail.id,
                email: checkEmail.email,
                name: checkEmail.name,
                role: checkEmail.role,
            };
            const token = await this.jwtService.signAsync({ payload }, { expiresIn: '10000000h' });
            return {
                payload,
                access_token: token,
            };
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async authCheck(req) {
        try {
            const loginSession = req['user'];
            const user = await this.prisma.user.findFirst({
                where: {
                    id: loginSession.id,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                },
            });
            return user;
        }
        catch (error) {
            return null;
        }
    }
    async logout(req, res) {
        const loginSession = req['user'];
        const expiration = new Date(Date.now() - 1000);
        const newToken = this.jwtService.sign({
            id: loginSession.id,
            email: loginSession.email,
            name: loginSession.name,
            role: loginSession.role,
        }, { expiresIn: '1s' });
        res.header('Authorization', `Bearer ${newToken}`);
        return {
            statusCode: common_1.HttpStatus.OK,
            acess_token: newToken,
            message: 'Logout successful',
        };
    }
    async updateUser(authDto, id, req) {
        const user = req['user'];
        const paramId = id;
        console.log("id", id);
        console.log("user", user);
        if (!user) {
            throw new common_1.UnauthorizedException('unknown user');
        }
        const userData = await this.prisma.user.findFirst({
            where: {
                id: paramId,
            },
        });
        userData.name = authDto.name;
        userData.email = authDto.email;
        userData.password = authDto.password;
        console.log("userDataa", userData);
        return this.prisma.user.update({
            where: { id: user.id },
            data: userData,
        });
    }
    async deleteUser(where) {
        return this.prisma.user.delete({ where });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
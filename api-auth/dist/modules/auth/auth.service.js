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
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma.service");
const axios_1 = require("axios");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        try {
            console.log('registerDto', registerDto);
            const saltRounds = 10;
            const checkEmail = await this.prisma.user.findFirst({
                where: {
                    email: registerDto.email,
                },
            });
            if (checkEmail) {
                throw new Error('Email already exists');
            }
            const bcryptPassword = await bcrypt.hash(registerDto.password, saltRounds);
            console.log('bcryptPassword', bcryptPassword);
            const user = await this.prisma.user.create({
                data: {
                    name: registerDto.name,
                    email: registerDto.email,
                    password: bcryptPassword,
                },
            });
            console.log('user', user);
            if (!user) {
                throw new Error('Failed to create user');
            }
            const profileURL = `${process.env.SVC_DB_PROFILE}/api/v1/profile?userId=${user.id}`;
            const profile = await axios_1.default.post(profileURL, {
                authorId: user.id,
                display_name: user.name,
                gender: '',
                birthday: new Date('0000-00-00'),
                horoscope: '',
                zodiac: '',
                height: 0,
                weight: 0,
                image: '',
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(params) {
        let QueryArr = [];
        const skip = params.per_page * (params.page - 1);
        const take = params.per_page;
        if (params.username) {
            QueryArr.push({
                name: params.username,
            });
        }
        const [total_data, datas] = await this.prisma.$transaction([
            this.prisma.user.count({
                where: {
                    AND: QueryArr,
                },
            }),
            this.prisma.user.findMany({
                where: {
                    AND: QueryArr,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    ceatedAt: true,
                    chat_id: true,
                },
                take,
                orderBy: {
                    id: params.sort,
                },
            }),
        ]);
        console.log('datas', datas);
        console.log('params', params);
        return {
            datas,
            total_data,
        };
    }
    async login(authLoginDto, res) {
        try {
            const checkEmail = await this.prisma.user.findFirst({
                where: {
                    email: authLoginDto.email,
                },
            });
            if (!checkEmail) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                    message: 'Invalid email or password',
                });
            }
            const passwordMatch = await bcrypt.compare(authLoginDto.password, checkEmail.password);
            console.log('passwordMatch', passwordMatch);
            if (!passwordMatch) {
                throw new Error('Invalid email or password');
            }
            const payload = {
                id: checkEmail.id,
                email: checkEmail.email.split('@')[0],
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
    async authCheck(params, req) {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
                console.error('Token is missing or invalid.');
            }
            const compare = jwt.verify(token, process.env.JWT_SECRET);
            const userId = compare.payload.id;
            const id = compare.payload.id;
            console.log('compare', compare);
            console.log('userId', userId);
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
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
        const blackListToken = await this.prisma.blacklistedToken.create({
            data: {
                token: req.header('Authorization').replace('Bearer ', ''),
                expiresAt: new Date(),
            },
        });
        console.log('blackListToken', blackListToken);
        return blackListToken;
    }
    async updateUser(updateDTO, params, req) {
        const user = req['user'];
        console.log('user', user);
        if (user.id !== params.user_id) {
            throw new common_1.UnauthorizedException('unknown user');
        }
        const arrQuery = [];
        if (params.user_id) {
            arrQuery.push({
                id: params.user_id,
            });
        }
        if (!user) {
            throw new common_1.UnauthorizedException('unknown user');
        }
        console.log('arrQuery', arrQuery);
        console.log('params.user_id', params.user_id);
        const userData = await this.prisma.user.findFirst({
            where: {
                AND: arrQuery,
            },
        });
        userData.name = updateDTO.name;
        userData.email = updateDTO.email;
        userData.password = updateDTO.password;
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
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
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let AuthService = class AuthService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async register(registerDto) {
        try {
            const data = await this.httpService
                .post(`${process.env.SVC_DB_AUTH}/api/v1/auth/register`, registerDto)
                .pipe((0, rxjs_1.map)((response) => response.data), (0, rxjs_1.catchError)((e) => {
                throw new common_1.HttpException(`${e.response.statusText} : ${e.response.data?.errorMessage}`, e.response.status);
            }))
                .toPromise();
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.response.statusText} : ${error.response.data?.errorMessage}`, error.response.status);
        }
    }
    async findAll(params, token) {
        try {
            const data = this.httpService
                .get(`${process.env.SVC_DB_AUTH}/api/v1/auth?userId=${params}`, {
                params,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .pipe((0, rxjs_1.map)((response) => response.data), (0, rxjs_1.catchError)((e) => {
                throw new common_1.HttpException(`${e.response.statusText} : ${e.response.data?.errorMessage}`, e.response.status);
            }))
                .toPromise();
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.response.statusText} : ${error.response.data?.errorMessage}`, error.response.status);
        }
    }
    async login(authLoginDto) {
        try {
            const data = await this.httpService
                .post(`${process.env.SVC_DB_AUTH}/api/v1/auth/login`, authLoginDto)
                .pipe((0, rxjs_1.map)((response) => response.data), (0, rxjs_1.catchError)((e) => {
                throw new common_1.HttpException(`${e.response.statusText} : ${e.response.data?.errorMessage}`, e.response.status);
            }))
                .toPromise();
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.response.statusText} : ${error.response.data?.errorMessage}`, error.response.status);
        }
    }
    async authCheck(req, token) {
        try {
            const tokenn = req.headers.authorization?.split(' ')[1];
            const data = await this.httpService
                .get(`${process.env.SVC_DB_AUTH}/api/v1/auth/getProfile`, {
                headers: {
                    Authorization: `Bearer ${tokenn}`,
                },
            })
                .pipe((0, rxjs_1.map)((response) => response.data), (0, rxjs_1.catchError)((e) => {
                throw new common_1.HttpException(`${e.response.statusText} : ${e.response.data?.errorMessage}`, e.response.status);
            }))
                .toPromise();
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.response.statusText} : ${error.response.data?.errorMessage}`, error.response.status);
        }
    }
    async logout(req) {
        try {
            const tokenn = req.headers.authorization?.split(' ')[1];
            const data = await this.httpService
                .post(`${process.env.SVC_DB_AUTH}/api/v1/auth/logout`, tokenn, {
                headers: {
                    Authorization: `Bearer ${tokenn}`,
                },
            })
                .pipe((0, rxjs_1.map)((response) => response.data), (0, rxjs_1.catchError)((e) => {
                throw new common_1.HttpException(`${e.response.statusText} : ${e.response.data?.errorMessage}`, e.response.status);
            }))
                .toPromise();
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.response.statusText} : ${error.response.data?.errorMessage}`, error.response.status);
        }
    }
    async updateUser(updateDTO, params, req) {
        try {
            const tokenn = req.headers.authorization?.split(' ')[1];
            const data = await this.httpService
                .post(`${process.env.SVC_DB_AUTH}/api/v1/auth/update?user_id=${params}`, updateDTO, {
                headers: {
                    Authorization: `Bearer ${tokenn}`,
                },
            })
                .pipe((0, rxjs_1.map)((response) => response.data), (0, rxjs_1.catchError)((e) => {
                throw new common_1.HttpException(`${e.response.statusText} : ${e.response.data?.errorMessage}`, e.response.status);
            }))
                .toPromise();
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.response.statusText} : ${error.response.data?.errorMessage}`, error.response.status);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModules = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auths/auth.module");
const chats_module_1 = require("./chats/chats.module");
const messages_module_1 = require("./messages/messages.module");
let ServiceModules = class ServiceModules {
};
exports.ServiceModules = ServiceModules;
exports.ServiceModules = ServiceModules = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, chats_module_1.ChatModule, messages_module_1.MessagesModule],
    })
], ServiceModules);
//# sourceMappingURL=service.modules.js.map
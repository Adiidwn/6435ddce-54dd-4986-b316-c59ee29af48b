"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLembagaModule = void 0;
const common_1 = require("@nestjs/common");
const dashboard_lembaga_controller_1 = require("./dashboard-lembaga.controller");
const dashboard_lembaga_service_1 = require("./dashboard-lembaga.service");
let DashboardLembagaModule = class DashboardLembagaModule {
};
exports.DashboardLembagaModule = DashboardLembagaModule;
exports.DashboardLembagaModule = DashboardLembagaModule = __decorate([
    (0, common_1.Module)({
        controllers: [dashboard_lembaga_controller_1.DashboardLembagaController],
        providers: [dashboard_lembaga_service_1.DashboardLembagaService],
    })
], DashboardLembagaModule);
//# sourceMappingURL=dashboard-lembaga.module.js.map
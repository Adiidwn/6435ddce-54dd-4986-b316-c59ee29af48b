"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosInstanceProvider = void 0;
const axios_1 = require("axios");
exports.AxiosInstanceProvider = {
    provide: 'AXIOS_INSTANCE_TOKEN',
    useValue: axios_1.default.create(),
};
//# sourceMappingURL=axios.provider.js.map
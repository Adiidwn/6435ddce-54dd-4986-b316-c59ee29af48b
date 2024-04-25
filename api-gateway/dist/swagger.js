"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = exports.buildSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const buildSwagger = (app) => {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .build();
    return swagger_1.SwaggerModule.createDocument(app, config);
};
exports.buildSwagger = buildSwagger;
const setupSwagger = (app) => {
    const document = (0, exports.buildSwagger)(app);
    swagger_1.SwaggerModule.setup('api', app, document);
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map
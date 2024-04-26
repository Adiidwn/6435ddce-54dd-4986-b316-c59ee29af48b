"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("./swagger");
const microservices_1 = require("@nestjs/microservices");
const microserviceOptions = {
    transport: microservices_1.Transport.RMQ,
    options: {
        urls: ['amqp://localhost:5672'],
        queue: 'api-gateway-queue',
    },
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    (0, swagger_1.setupSwagger)(app);
    app.setGlobalPrefix('/api/v1');
    const PORT = process.env.PORT || 8000;
    await app.listen(PORT);
    console.log('Application is running on: ', PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map
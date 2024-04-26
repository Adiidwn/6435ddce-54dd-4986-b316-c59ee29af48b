import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const buildSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  return SwaggerModule.createDocument(app, config);
};

export const setupSwagger = (app: INestApplication) => {
  const document = buildSwagger(app);
  SwaggerModule.setup('api', app, document);
};

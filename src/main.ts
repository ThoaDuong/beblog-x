import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
        'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount',
        'http://localhost:4200'
      ]
  });
  app.use(bodyParser.json({ limit: "50mb" }))
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

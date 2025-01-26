import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Origine autorisée (le frontend)
    credentials: true,              // Si tu utilises des cookies/sessions
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Méthodes autorisées
    allowedHeaders: 'Content-Type, Accept, Authorization', // En-têtes autorisés
  });

  await app.listen(3000);
}
bootstrap();

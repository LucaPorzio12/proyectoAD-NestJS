import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        credentials: true,
        origin: ['*'] //-> para que sea pública
        // origin: ['http://localhost:8100','http://localhost:4200'] ->Privada
    })
    await app.listen(3000);
}

bootstrap();

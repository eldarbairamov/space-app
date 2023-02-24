import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

const start = async () => {
   const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe());
   app.enableCors()
   await app.listen(process.env.PORT);
};

start().then(() => console.log(`Server started on port ${process.env.PORT}`));
import * as path from "node:path";

import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";

import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';

import { configProvider } from "./app.config.provider";

@Module({
  imports: [
    ConfigModule.forRoot({
            isGlobal: true,
            cache: true
        }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public')
    }),
    FilmsModule,
    OrderModule
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}

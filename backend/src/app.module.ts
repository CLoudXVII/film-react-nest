import * as path from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { AppConfigModule } from './app.config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppConfigModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: ['CONFIG'],
      useFactory: (config: any) => ({
        type: 'postgres',
        host: config.database.host,
        port: +config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.name,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    FilmsModule,
    OrderModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item, Organization, Pricing } from './app.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host : configService.get("MASTER_DB_HOST"),
        port: 18815,
        username: configService.get("MASTER_DB_USER"),
        password: configService.get("MASTER_DB_PASSWORD"),
        database: configService.get("MASTER_DB_NAME"),
        entities: [Item, Organization, Pricing],
        // logging: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Item, Organization, Pricing]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
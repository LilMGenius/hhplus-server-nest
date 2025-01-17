import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig, dbConfig } from 'src/infra/configs/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [dbConfig],
          envFilePath: `.env`, // .env.${process.env.NODE_ENV}`,
          isGlobal: true,
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        ...configService.get<DatabaseConfig>('database'),
        synchronize: true,
        autoLoadEntities: true,
        entities: ['**/*.entity{.ts,.js}'],
        relationLoadStrategy: 'join',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

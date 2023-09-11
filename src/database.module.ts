import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Games } from './games/games.entity';
import { Players } from './players/players.entity';
import { Moves } from './moves/moves.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: config.get('POSTGRES_PORT'),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        entities: [Games, Players, Moves],
        synchronize: true,
        dropSchema:
          process.env.NODE_ENV !== 'production' || 'development' ? true : false,
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     type: 'sqlite',
    //     database: config.get<string>('SQL_DB_NAME'),
    //     entities: [Games, Players, Moves],
    //     synchronize: true,
    //   }),
    // }),
  ],
})
export class DatabaseModule {}

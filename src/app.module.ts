import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Games } from './games/games.entity';
import { PlayersModule } from './players/players.module';
import { Players } from './players/players.entity';
import { MovesModule } from './moves/moves.module';
import { Moves } from './moves/moves.entity';
import { EventsModule } from './events/events.module';
import * as Joi from 'joi';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.string().required(),
      }),
    }),
    GamesModule,
    DatabaseModule,
    PlayersModule,
    MovesModule,
    EventsModule,
  ],
  providers: [],
})
export class AppModule {}

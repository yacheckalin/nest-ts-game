import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Games } from './games/games.entity';
import { PlayersModule } from './players/players.module';
import { Players } from './players/players.entity';
import { MovesModule } from './moves/moves.module';
import { Moves } from './moves/moves.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    GamesModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('SQL_DB_NAME'),
        entities: [Games, Players, Moves],
        synchronize: true,
      }),
    }),
    PlayersModule,
    MovesModule,
  ],
  providers: [],
})
export class AppModule {}

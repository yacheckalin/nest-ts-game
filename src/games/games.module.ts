import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Games } from './games.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Games])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}

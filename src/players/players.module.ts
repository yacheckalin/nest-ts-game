import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Players } from './players.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Players])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}

import { Controller, Post, Body } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Games } from './games.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  createNewGame(@Body() body: CreateGameDto): Promise<Games> {
    return this.gamesService.createGame(body);
  }
}

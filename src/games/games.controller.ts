import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Games } from './games.entity';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  createNewGame(@Body() body: CreateGameDto): Promise<Games> {
    return this.gamesService.createGame(body);
  }

  @Patch('/:id')
  updateGameById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: Partial<UpdateGameDto>,
  ): Promise<Games> {
    return this.gamesService.updateGame(+id, body);
  }

  @Get('/:id')
  getGameInfo(@Param('id', new ParseIntPipe()) id: number): Promise<Games> {
    return this.gamesService.getGameInfoById(+id);
  }

  @Get()
  getAllGames(): Promise<Games[] | []> {
    return this.gamesService.getAllGames();
  }
}

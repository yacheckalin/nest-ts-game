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
import { AddPlayerDto } from './dto/add-player.dto';
import { MakeMoveDto } from 'src/moves/dto/make-move.dto';
import { Moves } from 'src/moves/moves.entity';
import { MovesService } from 'src/moves/moves.service';

@Controller('games')
export class GamesController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly movesService: MovesService,
  ) {}

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

  @Post('/:id/start')
  startGame(@Param('id', new ParseIntPipe()) id: number): Promise<Games> {
    return this.gamesService.startGame(+id);
  }

  @Post('/:id/stop')
  stopGame(@Param('id', new ParseIntPipe()) id: number): Promise<Games> {
    return this.gamesService.stopGame(+id);
  }

  @Post('/:id/add-player')
  addPlayer(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: AddPlayerDto,
  ): Promise<Games> {
    return this.gamesService.addPlayerToGameById(+id, +body.playerId);
  }

  @Post('/:id/remove-player')
  removePlayer(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: AddPlayerDto,
  ): Promise<Games> {
    return this.gamesService.removePlayerFromGameById(+id, +body.playerId);
  }

  @Post('/make-move')
  makeMove(@Body() body: Partial<MakeMoveDto>): Promise<Moves> {
    return this.movesService.makeMove(body);
  }
}

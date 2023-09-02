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
import { MakeMoveDto } from '../moves/dto/make-move.dto';
import { Moves } from '../moves/moves.entity';
import { MovesService } from '../moves/moves.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly movesService: MovesService,
  ) {}

  @ApiOperation({ summary: 'Create new game' })
  @Post()
  createNewGame(@Body() body: CreateGameDto): Promise<Games> {
    return this.gamesService.createGame(body);
  }

  @ApiOperation({ summary: 'Update game by id' })
  @Patch('/:id')
  updateGameById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: Partial<UpdateGameDto>,
  ): Promise<Games> {
    return this.gamesService.updateGame(+id, body);
  }

  @ApiOperation({ summary: 'Get games info by id' })
  @Get('/:id')
  getGameInfo(@Param('id', new ParseIntPipe()) id: number): Promise<Games> {
    return this.gamesService.getGameInfoById(+id);
  }

  @ApiOperation({ summary: 'Get all games' })
  @Get()
  getAllGames(): Promise<Games[] | []> {
    return this.gamesService.getAllGames();
  }

  @ApiOperation({ summary: 'Start prepared game' })
  @Post('/:id/start')
  startGame(@Param('id', new ParseIntPipe()) id: number): Promise<Games> {
    return this.gamesService.startGame(+id);
  }

  @ApiOperation({ summary: 'Stop playing game' })
  @Post('/:id/stop')
  stopGame(@Param('id', new ParseIntPipe()) id: number): Promise<Games> {
    return this.gamesService.stopGame(+id);
  }

  @ApiOperation({ summary: 'Add new player to the games players pool' })
  @Post('/:id/add-player')
  addPlayer(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: AddPlayerDto,
  ): Promise<Games> {
    return this.gamesService.addPlayerToGameById(+id, +body.playerId);
  }

  @ApiOperation({ summary: 'Remove player from the pool' })
  @Post('/:id/remove-player')
  removePlayer(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: AddPlayerDto,
  ): Promise<Games> {
    return this.gamesService.removePlayerFromGameById(+id, +body.playerId);
  }

  @ApiOperation({ summary: 'Make a move in the current game' })
  @Post('/make-move')
  makeMove(@Body() body: Partial<MakeMoveDto>): Promise<Moves> {
    return this.movesService.makeMove(body);
  }
}

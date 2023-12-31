import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Players } from './players.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdatePlayerDto } from './dto/update-player.dto';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @ApiOperation({ summary: 'Create new player' })
  @ApiBody({ type: () => CreatePlayerDto })
  @Post()
  createPlayer(@Body() body: CreatePlayerDto): Promise<Players> {
    return this.playersService.createPlayer(body);
  }

  @ApiOperation({ summary: 'Get players info by id' })
  @Get('/:id')
  getPlayerInfo(@Param('id', new ParseIntPipe()) id: number): Promise<Players> {
    return this.playersService.getPlayerById(+id);
  }

  @ApiOperation({ summary: 'Update players info by id' })
  @ApiBody({ type: () => UpdatePlayerDto })
  @Patch('/:id')
  updatePlayer(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdatePlayerDto,
  ): Promise<Players> {
    return this.playersService.updatePlayerById(+id, body);
  }

  @ApiOperation({ summary: 'Get all players' })
  @Get()
  getAllPlayers(): Promise<Players[] | []> {
    return this.playersService.findAllPlayers();
  }
}

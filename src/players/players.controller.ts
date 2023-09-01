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

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  createPlayer(@Body() body: Partial<CreatePlayerDto>): Promise<Players> {
    return this.playersService.createPlayer(body);
  }

  @Get('/:id')
  getPlayerInfo(@Param('id', new ParseIntPipe()) id: number): Promise<Players> {
    return this.playersService.getPlayerById(+id);
  }

  @Patch('/:id')
  updatePlayer(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: Partial<CreatePlayerDto>,
  ): Promise<Players> {
    return this.playersService.updatePlayerById(+id, body);
  }
}

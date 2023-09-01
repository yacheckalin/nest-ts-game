import { Body, Controller, Post } from '@nestjs/common';
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
}

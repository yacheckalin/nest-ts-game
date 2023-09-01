import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Players } from './players.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Players) private readonly repo: Repository<Players>,
  ) {}

  async createPlayer(body: Partial<CreatePlayerDto>): Promise<Players> {
    const player = await this.repo.create(body);
    return this.repo.save(player);
  }
}

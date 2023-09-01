import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Games } from './games.entity';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Games) private readonly repo: Repository<Games>,
  ) {}

  async createGame(body: CreateGameDto): Promise<Games> {
    const game = await this.repo.create({ createdAt: new Date(), ...body });
    return this.repo.save(game);
  }
}

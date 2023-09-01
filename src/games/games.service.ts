import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Games } from './games.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Games) private readonly repo: Repository<Games>,
  ) {}

  async createGame(body: CreateGameDto): Promise<Games> {
    const game = await this.repo.create({ createdAt: new Date(), ...body });
    return this.repo.save(game);
  }

  async updateGame(id: number, body: Partial<UpdateGameDto>): Promise<Games> {
    const game = await this.repo.findOne({ where: { id } });

    if (!game) {
      throw new NotFoundException('There is no game with such ID');
    }
    const updatedGame = { ...game, ...body };
    return this.repo.save(updatedGame);
  }

  async getGameInfoById(id: number): Promise<Games> {
    const game = await this.repo.findOne({ where: { id } });

    if (!game) {
      throw new NotFoundException('There is no game with such ID');
    }
    return game;
  }

  async getAllGames(): Promise<Games[] | []> {
    return this.repo.find();
  }
}

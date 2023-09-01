import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const game = await this.repo.findOne({
      where: { id },
      relations: { players: true },
    });

    if (!game) {
      throw new NotFoundException('There is no game with such ID');
    }
    return game;
  }

  async getAllGames(): Promise<Games[] | []> {
    return this.repo.find({ relations: { players: true } });
  }

  async startGame(id: number) {
    const game = await this.repo.findOne({
      where: { id },
      relations: { players: true },
    });

    if (!game) {
      throw new NotFoundException('There is no game with such ID');
    }
    if (game.endedAt && game.winner) {
      throw new BadRequestException('The game has already overed!');
    }
    if (game.players.length < game.maxPlayer) {
      throw new BadRequestException(
        `This game doesn't have enough players to start!`,
      );
    }

    return this.repo.save({ ...game, startedAt: new Date() });
  }

  async stopGame(id: number) {
    const game = await this.repo.findOne({
      where: { id },
      relations: { players: true },
    });

    if (!game) {
      throw new NotFoundException('There is no game with such ID');
    }
    if (!game.startedAt) {
      throw new BadRequestException('Game did not start yet!');
    }
    if (game.endedAt && game.winner) {
      throw new BadRequestException('Game has already finished!');
    }

    return this.repo.save({ ...game, stoppedAt: new Date() });
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Players, PlayersStatus } from './players.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Players) private readonly repo: Repository<Players>,
  ) {}

  async createPlayer(body: Partial<CreatePlayerDto>): Promise<Players> {
    const player = await this.repo.create(body);
    return this.repo.save(player);
  }

  async getPlayerById(id: number): Promise<Players> {
    const player = await this.repo.findOne({
      where: { id },
      relations: { game: true },
    });

    if (!player) {
      throw new NotFoundException('There is no player with such ID');
    }

    return player;
  }

  async updatePlayerById(id: number, body: UpdatePlayerDto): Promise<Players> {
    try {
      const player = await this.getPlayerById(id);

      const updatedPlayer = { ...player, ...body };
      return this.repo.save(updatedPlayer);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  findAllPlayers(): Promise<Players[] | []> {
    return this.repo.find({ relations: { game: true } });
  }

  getNotBusyPlayer(): Promise<Players> {
    return this.repo.findOne({ where: { status: PlayersStatus.PENDING } });
  }
}

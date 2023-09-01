import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Players } from './players.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Players) private readonly repo: Repository<Players>,
  ) {}
}

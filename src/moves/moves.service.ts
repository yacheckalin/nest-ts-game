import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Moves } from './moves.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MakeMoveDto } from './dto/make-move.dto';
import { Players, PlayersStatus } from '../players/players.entity';
import { Games } from '../games/games.entity';
import { calculate } from './store/helpers';
import { FIRST_MOVE_VALUE_LIMIT } from './store/constants';

@Injectable()
export class MovesService {
  constructor(
    @InjectRepository(Moves) private readonly repo: Repository<Moves>,
    @InjectRepository(Players)
    private readonly playersRepo: Repository<Players>,
    @InjectRepository(Games) private readonly gamesRepo: Repository<Games>,
  ) {}

  async getAllByGameId(gameId: number): Promise<Moves[]> {
    const game = await this.gamesRepo.findOne({ where: { id: gameId } });

    if (!game) {
      throw new NotFoundException('There is no such game');
    }

    return await this.repo
      .createQueryBuilder('moves')
      .innerJoinAndSelect('moves.game', 'game')
      .innerJoinAndSelect('moves.player', 'player')
      .where('game.id = :gameId', { gameId })
      .getMany();
  }

  async makeMove(data: Partial<MakeMoveDto>): Promise<Moves> {
    const player = await this.playersRepo.findOne({
      where: { id: +data.player },
      relations: { game: true },
    });

    const game = await this.gamesRepo.findOne({
      where: { id: +data.game },
      relations: { players: true, moves: { player: true } },
      order: { moves: { createdAt: 'DESC' }, players: { numberInLine: 'ASC' } },
    });

    // if game hasn't started
    // if game has ended
    // if game doesn't exist
    if (!game || !game.startedAt || game.endedAt) {
      throw new BadRequestException('Catch game error ...');
    }

    // if player don't have permission to make move
    if (
      !game?.players.length ||
      !game.players.filter(({ id }) => id === data.player).length
    ) {
      throw new BadRequestException(
        'Player does not have permission to make a move in this game!',
      );
    }

    const numberOfPlayers = game.players.length;
    const lastMovePlayer = game.moves[0]?.player;
    const lastMoveValue = game.moves[0]?.value;

    // if it is not the first move
    // if last move was called by the last player in the line,
    //    then first player should make a move

    if (
      (game.moves.length &&
        lastMovePlayer?.numberInLine === numberOfPlayers &&
        player?.numberInLine !== 1) ||
      (lastMovePlayer?.numberInLine < numberOfPlayers &&
        player?.numberInLine != lastMovePlayer.numberInLine + 1)
    ) {
      throw new BadRequestException('Wrong order: not your move!');
    }

    const returnedValue =
      data?.value ||
      calculate(
        game.moves.length
          ? lastMoveValue
          : Math.floor(Math.random() * FIRST_MOVE_VALUE_LIMIT) + 1,
      );

    const returnedDate = new Date();
    const move = this.repo.create({
      ...data,
      value: returnedValue,
      player,
      game,
      createdAt: returnedDate,
    });

    // WINNING GAME LOGIC
    if (returnedValue === 1) {
      await this.gamesRepo.save({
        ...game,
        endedAt: returnedDate,
        winner: player.id,
      });

      // change status all involved players to PENDING
      for (const player of game.players) {
        await this.playersRepo.save({
          ...player,
          status: PlayersStatus.PENDING,
          numberInLine: 1,
        });
      }
    }

    return this.repo.save(move);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Games } from 'src/games/games.entity';
import { Moves } from 'src/moves/moves.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PlayersStatus {
  WAITING = 'waiting',
  PLAYING = 'playing',
}

@Entity()
export class Players {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Player_1', description: 'NickName of the Player' })
  @Column()
  nickName: string;

  @ApiProperty({
    examples: [PlayersStatus.PLAYING, PlayersStatus.WAITING],
    description: 'Shows whos been playing',
  })
  @Column({ default: PlayersStatus.WAITING, enum: PlayersStatus })
  status: string;

  @ApiProperty({ example: 1, description: 'The number in players pool' })
  @Column({ default: 1 })
  numberInLine: number;

  @ManyToOne(() => Games, (game) => game.players)
  game: Games;

  @OneToMany(() => Moves, (move) => move.player)
  move: Moves[];
}

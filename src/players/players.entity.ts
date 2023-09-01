import { Games } from 'src/games/games.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum PlayersStatus {
  WAITING = 'waiting',
  PLAYING = 'playing',
}

@Entity()
export class Players {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @Column({ default: PlayersStatus.WAITING, enum: PlayersStatus })
  status: string;

  @Column({ default: 1 })
  numberInLine: number;

  @ManyToOne(() => Games, (game) => game.players)
  game: Games;
}

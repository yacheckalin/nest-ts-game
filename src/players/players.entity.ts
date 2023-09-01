import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

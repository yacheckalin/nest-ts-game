import { Players } from 'src/players/players.entity';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Games {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 2 })
  maxPlayer: number;

  @Column({ default: null })
  winner: number;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  startedAt: Date;

  @Column({ nullable: true })
  stoppedAt: Date;

  @Column({ nullable: true })
  endedAt: Date;

  @OneToMany(() => Players, (player) => player.game)
  players: Players[];

  @AfterInsert()
  @AfterLoad()
  @AfterUpdate()
  async nullChecks() {
    if (!this.players) {
      this.players = [];
    }
  }
}

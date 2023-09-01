import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Games {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 2 })
  maxPlayer: number;

  @Column({ default: null })
  winner: number;

  @Column()
  createdAt: Date;

  @Column()
  startedAt: Date;

  @Column()
  stoppedAt: Date;

  @Column()
  endedAt: Date;
}

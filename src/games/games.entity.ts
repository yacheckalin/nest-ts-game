import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

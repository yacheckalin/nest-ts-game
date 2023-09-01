import { Games } from 'src/games/games.entity';
import { Players } from 'src/players/players.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Moves {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Players, (player) => player.move)
  player: Players;

  @ManyToOne(() => Games, (game) => game.moves)
  game: Games;

  @Column()
  value: number;

  @Column()
  createdAt: Date;
}

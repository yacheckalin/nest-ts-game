import { IsDate, IsNumber, IsPositive, Min } from 'class-validator';

export class UpdateGameDto {
  @IsDate()
  createdAt: Date;
  @IsDate()
  startedAt: Date;
  @IsDate()
  stoppedAt: Date;
  @IsDate()
  endedAt: Date;
  @IsNumber()
  @Min(2)
  maxPlayer: number;
  @IsPositive()
  winner: number;
}

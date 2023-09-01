import { IsNumber, IsOptional } from 'class-validator';

export class MakeMoveDto {
  @IsNumber()
  player: number;

  @IsNumber()
  game: number;

  @IsNumber()
  @IsOptional()
  value: number;
}

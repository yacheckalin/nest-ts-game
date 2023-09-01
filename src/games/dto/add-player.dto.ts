import { IsNumber } from 'class-validator';

export class AddPlayerDto {
  @IsNumber()
  playerId: number;
}

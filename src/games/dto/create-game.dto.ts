import { IsNumber, Min } from 'class-validator';

export class CreateGameDto {
  @IsNumber()
  @Min(2)
  maxPlayer: number;
}

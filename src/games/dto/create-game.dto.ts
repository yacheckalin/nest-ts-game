import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ required: true, default: 2 })
  @IsNumber()
  @Min(2)
  maxPlayer: number;
}

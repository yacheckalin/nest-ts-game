import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @Min(2)
  maxPlayer: number;
}

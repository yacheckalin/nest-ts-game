import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddPlayerDto {
  @ApiProperty({ required: true })
  @IsNumber()
  playerId: number;
}

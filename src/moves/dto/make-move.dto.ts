import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class MakeMoveDto {
  @ApiProperty({ required: true })
  @IsNumber()
  player: number;

  @ApiProperty({ required: true })
  @IsNumber()
  game: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  value: number;
}

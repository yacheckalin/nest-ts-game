import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsPositive, Min } from 'class-validator';

export class UpdateGameDto {
  @ApiProperty({ required: true })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ required: true })
  @IsDate()
  startedAt: Date;

  @ApiProperty({ required: true })
  @IsDate()
  stoppedAt: Date;

  @ApiProperty({ required: true })
  @IsDate()
  endedAt: Date;

  @ApiProperty({ required: true })
  @IsNumber()
  @Min(2)
  maxPlayer: number;

  @ApiProperty({ required: true })
  @IsPositive()
  winner: number;
}

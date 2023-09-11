import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsPositive, Min } from 'class-validator';

export class UpdateGameDto {
  @ApiProperty({ required: false })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ required: false })
  @IsDate()
  startedAt: Date;

  @ApiProperty({ required: false })
  @IsDate()
  stoppedAt: Date;

  @ApiProperty({ required: false })
  @IsDate()
  endedAt: Date;

  @ApiProperty({ required: false })
  @IsNumber()
  @Min(2)
  maxPlayer: number;

  @ApiProperty({ required: false })
  @IsPositive()
  winner: number;
}

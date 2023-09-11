import { IsEnum, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { PlayersStatus } from '../players.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ required: true })
  @IsString()
  nickName: string;

  @ApiProperty({
    required: true,
    isArray: false,
    enum: PlayersStatus,
    default: PlayersStatus.PENDING,
  })
  @IsEnum(PlayersStatus)
  status: string;

  @ApiProperty({ required: true, default: 1 })
  @IsOptional()
  @Min(1)
  numberInLine: number;
}

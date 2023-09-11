import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';
import { PlayersStatus } from '../players.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ required: true })
  @IsString()
  nickName: string;

  @ApiProperty({ required: true })
  @IsEnum(PlayersStatus)
  status: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  numberInLine: number;
}

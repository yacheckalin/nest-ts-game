import { IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { PlayersStatus } from '../players.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ required: true })
  @IsString()
  nickName: string;

  @ApiProperty({
    required: false,
    isArray: false,
    enum: PlayersStatus,
    default: PlayersStatus.PENDING,
  })
  @IsEnum(PlayersStatus)
  @IsOptional()
  status?: PlayersStatus;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @Min(1)
  numberInLine?: number;
}

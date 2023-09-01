import { IsEnum, IsString } from 'class-validator';
import { PlayersStatus } from '../players.entity';

export class CreatePlayerDto {
  @IsString()
  nickName: string;

  @IsEnum(PlayersStatus)
  status: string;
}

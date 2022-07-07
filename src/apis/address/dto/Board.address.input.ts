import { InputType, OmitType } from '@nestjs/graphql';
import { BoardAddress } from '../entities/Board.address.entity';

@InputType()
export class BoardAddressInput extends OmitType(
  BoardAddress,
  ['id'],
  InputType,
) {}

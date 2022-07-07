import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardAddress } from '../address/entities/Board.address.entity';
import { BoardResolver } from './boards.resolver';
import { BoardService } from './boards.service';
import { Board } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardAddress, Board])],
  // controllers: [],
  providers: [BoardResolver, BoardService],
})
export class BoardModule {}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BoardAddress } from 'src/apis/address/entities/Board.address.entity';
import { Event } from 'src/apis/event/entities/event.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => Int)
  viewCount: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isFull: boolean;

  @Column()
  @Field(() => String)
  targetDate: Date;

  // @Column()
  // @Field(() => String)
  // targetEnd: Date;

  @Column()
  @Field(() => String)
  transport: string;

  @ManyToOne(() => User)
  @Field(() => User)
  writer: User;

  @ManyToOne(() => Event)
  @Field(() => Event)
  parentEvent: Event;

  @ManyToMany(() => User, (scheduledUsers) => scheduledUsers.scheduledBoards)
  @Field(() => [User])
  scheduledUsers: User[];

  @JoinColumn()
  @OneToOne(() => BoardAddress)
  @Field(() => BoardAddress)
  boardAddress: BoardAddress;
}

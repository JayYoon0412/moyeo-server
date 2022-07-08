import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PAYMENT_STATUS {
  PAYMENT = 'PAYMENT',
  CANCELLATION = 'CANCELLATION',
}

registerEnumType(PAYMENT_STATUS, {
  name: 'PAYMENT_STATUS',
});

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @CreateDateColumn()
  @Field(() => Date)
  transactAt: Date;

  @Column()
  @Field(() => PAYMENT_STATUS)
  status: PAYMENT_STATUS;

  @Column()
  @Field(() => Int)
  payAmount: number;

  @ManyToOne(() => User)
  @Field(() => User)
  buyer: User;
}

import { Injectable } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class UpdateBoardInput {
  //   @PrimaryGeneratedColumn('uuid')
  //   @Field(() => String)
  //   id: string;

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => Number)
  count: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isFull: boolean;

  @Column()
  @Field(() => String)
  targetDate: Date;

  @Column()
  @Field(() => String)
  transport: string;
}

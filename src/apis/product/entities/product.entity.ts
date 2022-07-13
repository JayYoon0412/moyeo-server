import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Image } from 'src/apis/image/entities/image.entity';
import { Payment } from 'src/apis/payment/entities/payment.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  contentSrc: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: 0 })
  @Field(() => Int)
  viewCount: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => Image)
  @Field(() => Image)
  mainImage: Image;

  @OneToMany(() => Image, (images) => images.product)
  @Field(() => [Image])
  subImages: Image[];

  @ManyToOne(() => User)
  @Field(() => User)
  seller: User;

  @JoinColumn()
  @OneToOne(() => Payment)
  @Field(() => Payment)
  transaction: Payment;

  @ManyToMany(() => User, (likedUsers) => likedUsers.dibsProducts)
  @Field(() => [User])
  likedUsers: User[];
}

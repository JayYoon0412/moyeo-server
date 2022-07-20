import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { EventModule } from './apis/event/event.module';
import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { BoardAddress } from './apis/address/entities/Board.address.entity';
import { FileModule } from './apis/fileupload/file.module';
import { BoardModule } from './apis/boards/boards.module';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { PhoneModule } from './apis/phone/phone.module';
import { EmailModule } from './apis/email/email.module';
import { ImageModule } from './apis/image/image.module';
import { ProductModule } from './apis/product/product.module';
import { PaymentModule } from './apis/payment/payment.module';
import { PostModule } from './apis/post/post.module';
import { CommentModule } from './apis/comment/comment.module';

@Module({
  imports: [
    EventModule,
    BoardModule,
    BoardAddress,
    CommentModule,
    ProductModule,
    PaymentModule,
    FileModule,
    PostModule,
    UserModule,
    AuthModule,
    PhoneModule,
    EmailModule,
    ImageModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:3000',
        credentials: 'include',
        exposedHeaders: ['Authorization', 'Set-Cookie', 'Cookie'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my-database',
//host: '10.13.16.3',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'moyeo_server_local',
      //database: 'moyeo_database',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://redis:6379',
      // url: 'redis://10.13.17.3:6379'
      isGlobal: true,
    }),
  ],
})
export class AppModule {}

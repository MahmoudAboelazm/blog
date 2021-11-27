import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ headers: req.headers }),
    }),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}

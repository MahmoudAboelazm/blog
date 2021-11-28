import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/users.module';
import { BlogsModule } from './blog/blogs.module';
import { createUsersLoader } from './common/DataLoaders/createUsersLoader';
import { UsersService } from './user/users.service';

@Module({
  imports: [
    UsersModule,
    BlogsModule,

    GraphQLModule.forRootAsync({
      imports: [UsersModule],
      inject: [UsersService],
      useFactory: (usersService: UsersService) => ({
        installSubscriptionHandlers: true,
        autoSchemaFile: 'schema.gql',
        playground: true,
        context: ({ req }) => ({
          headers: req.headers,
          usersLoader: createUsersLoader(usersService),
        }),
      }),
    }),

    ConfigModule.forRoot(),
  ],
})
export class AppModule {}

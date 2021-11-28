import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './users.providers';

@Module({
  imports: [DatabaseModule],
  exports: [UsersService],
  providers: [UsersResolver, UsersService, DateScalar, ...userProviders],
})
export class UsersModule {}

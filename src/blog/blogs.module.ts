import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { BlogsResolver } from './blogs.resolver';
import { BlogsService } from './blogs.service';
import { DatabaseModule } from '../database/database.module';
import { blogProviders } from './blogs.providers';

@Module({
  imports: [DatabaseModule],
  providers: [BlogsResolver, BlogsService, DateScalar, ...blogProviders],
})
export class BlogsModule {}

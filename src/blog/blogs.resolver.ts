import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  ObjectType,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { User } from 'src/user/models/user.model';
import { AuthGuard } from '../user/guard/auth.guard';
import { BlogsService } from './blogs.service';
import { BlogsArgs } from './dto/blogs-args.input';
import { NewBlogInput } from './dto/new-blog.input';
import { Blog, BlogsResponse } from './models/blog.model';

@ObjectType({ description: 'user' })
@Resolver(() => Blog)
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  @ResolveField(() => String)
  async creator(
    @Context('usersLoader') usersLoader: DataLoader<string, User>,
    @Root()
    blog: Blog,
  ): Promise<String> {
    return (await usersLoader.load(blog.creatorId as string)).username;
  }

  @ResolveField(() => String)
  textSnippet(@Root() root: Blog) {
    return root.text.slice(0, 5);
  }

  @Mutation(() => Blog)
  @UseGuards(AuthGuard)
  async addBlog(
    @Context('user') user: any,
    @Args('newBlog') newBlog: NewBlogInput,
  ): Promise<Blog> {
    newBlog.creatorId = user._id;
    newBlog.creationDate = new Date();
    return await this.blogsService.createBlog(newBlog);
  }

  @Query(() => BlogsResponse)
  async blogs(@Args('blogsArgs') blogsArgs: BlogsArgs): Promise<BlogsResponse> {
    return this.blogsService.getBlogs(blogsArgs);
  }
}

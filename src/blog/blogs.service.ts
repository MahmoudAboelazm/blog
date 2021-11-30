import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { BlogsArgs } from './dto/blogs-args.input';
import { NewBlogInput } from './dto/new-blog.input';
import { Blog, BlogsResponse } from './models/blog.model';

@Injectable()
export class BlogsService {
  constructor(
    @Inject('BLOG_MODEL')
    private blogsModel: Model<Blog>,
  ) {}

  async createBlog(data: NewBlogInput): Promise<Blog> {
    return await this.blogsModel.create(data);
  }

  async getBlogs(blogsArgs: BlogsArgs): Promise<BlogsResponse> {
    const { page, quantity } = blogsArgs,
      index = page * quantity - quantity;

    const blogs = await this.blogsModel
      .find()
      .sort({ creationDate: -1 })
      .skip(index)
      .limit(quantity);

    const total = await this.blogsModel.count();
    return { blogs, total };
  }

  async findBlogById(id: string): Promise<Blog | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.blogsModel.findById(id);
  }
}

import { Mongoose } from 'mongoose';
import { BlogSchema } from './schemas/blog.schema';

export const blogProviders = [
  {
    provide: 'BLOG_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Blog', BlogSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

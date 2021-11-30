import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'blog ' })
export class Blog {
  @Field(() => String)
  _id: String;

  @Field(() => String)
  title: String;

  @Field(() => String)
  text: String;

  @Field(() => Date)
  creationDate: Date;

  @Field(() => String)
  creatorId: String;
}

@ObjectType()
export class BlogsResponse {
  @Field(() => [Blog])
  blogs: Blog[];
  @Field(() => Number)
  total: number;
}

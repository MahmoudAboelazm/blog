import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BlogsArgs {
  @Field(() => Number)
  page: number;

  @Field(() => Number)
  quantity: number;
}

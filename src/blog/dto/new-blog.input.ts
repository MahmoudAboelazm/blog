import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class NewBlogInput {
  @Field(() => String)
  @Length(1, 50)
  title: string;

  @Field(() => String)
  @Length(8, 5000)
  text: string;

  @Field(() => Date, { nullable: true })
  creationDate: Date;

  @Field(() => String, { nullable: true })
  creatorId: String;
}

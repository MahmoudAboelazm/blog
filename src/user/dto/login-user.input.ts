import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  @Length(1, 30)
  usernameOrEmail: string;

  @Field()
  @Length(8, 30)
  password: string;
}

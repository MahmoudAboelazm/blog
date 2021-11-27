import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user ' })
export class User {
  @Field()
  username: String;

  @Field()
  email: String;

  @Field()
  creationDate: Date;

  @Field(() => [String])
  blogsIds: String[];
}

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field()
  user: User;
}

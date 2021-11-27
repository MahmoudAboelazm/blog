import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length, MaxLength, NotContains } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @Length(1, 30)
  @NotContains('@')
  username: string;

  @Field()
  @Length(8, 30)
  password: string;

  @Field()
  @IsEmail()
  @MaxLength(30)
  email: string;

  @Field({ nullable: true })
  creationDate: Date;
}

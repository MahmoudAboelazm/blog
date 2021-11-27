import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { LoginUserInput } from './dto/login-user.input';
import { NewUserInput } from './dto/new-user.input';
import { AuthGuard } from './guard/auth.guard';
import { LoginResponse, User } from './models/user.model';
import { UsersService } from './users.service';

@ObjectType({ description: 'user' })
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Args('loginInput') loginUserInput: LoginUserInput,
  ): Promise<LoginResponse> {
    try {
      return await this.usersService.findUser(loginUserInput);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => User)
  async register(
    @Args('newUserData') newUserData: NewUserInput,
  ): Promise<User> {
    try {
      return await this.usersService.createUser(newUserData);
    } catch (error) {
      throw error;
    }
  }
  @Query(() => User, { nullable: true })
  @UseGuards(AuthGuard)
  async me(@Context('user') user: User): Promise<User> {
    return user;
  }
}

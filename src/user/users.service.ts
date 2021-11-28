import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { User } from './models/user.model';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { hash, verify } from 'argon2';
import { LoginUserInput } from './dto/login-user.input';
import { TokenPayload } from './dto/token-payload.input';
import { handleError } from '../common/utils/handleError';

@Injectable()
export class UsersService {
  constructor(
    @Inject('User_MODEL')
    private userModel: Model<User & { _id: string; password: string }>,
  ) {}

  async jwtCreateToken(payload: TokenPayload) {
    return sign(payload, process.env.JWT_SECRETE);
  }

  async createUser(data: NewUserInput): Promise<User> {
    try {
      data.creationDate = new Date();
      data.password = await hash(data.password);
      return await this.userModel.create(data);
    } catch (err) {
      if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        throw handleError(ConflictException, `${field} already exist!`);
      }
      throw handleError(
        InternalServerErrorException,
        'Something went wrong when creating new user!',
      );
    }
  }

  async findUser(data: LoginUserInput) {
    const user = await this.userModel.findOne(
      data.usernameOrEmail.includes('@')
        ? {
            email: data.usernameOrEmail,
          }
        : { username: data.usernameOrEmail },
    );

    await this.validateUser(user, data);

    const token = await this.jwtCreateToken({
      _id: user._id,
      username: user.username,
    });

    return { user, token };
  }

  async validateUser(user: User & { password: string }, data: LoginUserInput) {
    if (!user)
      throw handleError(NotFoundException, "username or email doesn't exist!");

    const validate = await verify(user.password, data.password);
    if (!validate) throw handleError(NotFoundException, 'invalid password!');
  }

  async findByIds(userIds: string[]) {
    return await this.userModel.find({ _id: { $in: userIds } });
  }
}

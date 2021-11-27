import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify as jwtVerify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) return false;
    try {
      ctx.user = jwtVerify(ctx.headers.authorization, process.env.JWT_SECRETE);
      return true;
    } catch (err) {
      return false;
    }
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const tokenType: string =
      this.reflector.get<string>('tokenType', context.getHandler()) ||
      'access_token';
    const request = context.switchToHttp().getRequest();
    const token: string = request.cookies[tokenType];
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret:
          tokenType === 'access_token'
            ? process.env.SECRET_ACCESS_KEY
            : process.env.SECRET_REFRESH_KEY,
      });
      request['user'] = payload;
      request['token'] = token;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

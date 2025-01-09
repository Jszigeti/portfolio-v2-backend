import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(body: AuthDto): Promise<void> {
    const existingUser = await this.userService.findOne({ email: body.email });
    if (existingUser) throw new ForbiddenException();
    if (body.email !== process.env.ADMIN_EMAIL) throw new ForbiddenException();
    await this.prismaService.user.create({
      data: { ...body, password: await bcrypt.hash(body.password, 10) },
    });
  }

  async signin(body: AuthDto, res: Response): Promise<void> {
    const user = await this.userService.findOne({ email: body.email });
    if (!user) throw new BadRequestException();
    if (!(await bcrypt.compare(body.password, user.password)))
      throw new BadRequestException();
    const { accessToken, refreshToken } = await this.generateTokens(user.id);
    await this.updateRefreshToken(user.id, refreshToken);
    this.setCookie(
      res,
      'access_token',
      accessToken,
      this.configService.get<number>('jwt.accessToken.maxAge'),
    );
    this.setCookie(
      res,
      'refresh_token',
      refreshToken,
      this.configService.get<number>('jwt.refreshToken.maxAge'),
    );
  }

  async refresh(id: number, token: string, res: Response): Promise<void> {
    const user = await this.userService.findOne({ id });
    if (!user) throw new UnauthorizedException();
    if (!user.refreshToken) throw new UnauthorizedException();
    if (!(await bcrypt.compare(token, user.refreshToken)))
      throw new UnauthorizedException();
    const { accessToken, refreshToken } = await this.generateTokens(user.id);
    await this.updateRefreshToken(user.id, refreshToken);
    this.setCookie(
      res,
      'access_token',
      accessToken,
      this.configService.get<number>('jwt.accessToken.maxAge'),
    );
    this.setCookie(
      res,
      'refresh_token',
      refreshToken,
      this.configService.get<number>('jwt.refreshToken.maxAge'),
    );
  }

  async logout(id: number, res: Response): Promise<void> {
    const user = await this.userService.findOne({ id });
    if (!user) throw new BadRequestException();
    if (user.refreshToken) {
      await this.prismaService.user.update({
        where: { id },
        data: { refreshToken: null },
      });
      this.clearCookie(res, 'refresh_token');
    }
    this.clearCookie(res, 'access_token');
  }

  private async generateTokens(userId: number): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.accessToken.secret'),
      expiresIn: this.configService.get<string>('jwt.accessToken.expiresIn'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.refreshToken.secret'),
      expiresIn: this.configService.get<string>('jwt.refreshToken.expiresIn'),
    });
    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.prismaService.user.update({
      where: { id: userId },
      data: { refreshToken: await bcrypt.hash(refreshToken, 10) },
    });
  }

  private setCookie(
    res: Response,
    name: string,
    value: string,
    maxAge: number,
  ): void {
    res.cookie(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge,
    });
  }

  private clearCookie(res: Response, name: string): void {
    res.clearCookie(name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }
}

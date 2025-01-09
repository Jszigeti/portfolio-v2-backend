import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  accessToken: {
    secret: process.env.SECRET_ACCESS_KEY || 'defaultAccessTokenSecret',
    expiresIn: '15m',
    maxAge: 1000 * 60 * 15,
  },
  refreshToken: {
    secret: process.env.SECRET_REFRESH_KEY || 'defaultRefreshTokenSecret',
    expiresIn: '7d',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));

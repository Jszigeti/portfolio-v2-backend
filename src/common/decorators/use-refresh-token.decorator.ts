import { SetMetadata } from '@nestjs/common';

export const UseRefreshToken = () => SetMetadata('tokenType', 'refresh_token');

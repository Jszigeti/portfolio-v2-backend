import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { UseRefreshToken } from 'src/common/decorators/use-refresh-token.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiResponse } from 'src/common/types/api-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() body: AuthDto): Promise<ApiResponse> {
    await this.authService.signup(body);
    return {
      success: true,
      message: 'Account created successfully.',
    };
  }

  @Public()
  @Post('signin')
  async signin(
    @Body() body: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse> {
    await this.authService.signin(body, res);
    return {
      success: true,
      message: 'Logged in successfully.',
    };
  }

  @UseRefreshToken()
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse> {
    await this.authService.refresh(req.user.sub, req.token, res);
    return {
      success: true,
      message: 'Tokens refreshed successfully.',
    };
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse> {
    await this.authService.logout(req.user.sub, res);
    return {
      success: true,
      message: 'Logged out successfully.',
    };
  }
}

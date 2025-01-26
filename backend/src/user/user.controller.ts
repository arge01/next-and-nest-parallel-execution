import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.userService.findByUsername(body.username);
    if (!user || user.password !== body.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { username: user.username, role: user.role };
  }
}

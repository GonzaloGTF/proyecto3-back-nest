import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UsersService, readonly authService: AuthService) { }
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req.user)
    }

}

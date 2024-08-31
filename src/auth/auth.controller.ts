import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorator/public.decorator';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    @UseGuards(AuthGuard, AdminGuard)
    signUp(@Body() signUpDto: SignUpDto): Promise <{ token: string}>{
        return this.authService.signUp(signUpDto);
    }
    
    @Public()
    @Get('/login')
    login(@Body() loginDto: LoginDto): Promise <{ token: string}>{
        return this.authService.login(loginDto);
    }
}

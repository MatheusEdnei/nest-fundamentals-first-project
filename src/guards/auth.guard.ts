import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;
        const token = (authorization ?? '').split(' ')[1];

        try {
            const payload = this.authService.checkToken(token);
            request.tokenPayload = payload;
            return true;
        } catch (error) {
            return false;
        }
    }
}

import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    forwardRef,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(forwardRef() => AuthService)
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;
        const token = (authorization ?? '').split(' ')[1];

        try {
            const payload = this.authService.checkToken(token);
            request.tokenPayload = payload;
            request.user = await this.userService.show(payload.id);
            return true;
        } catch (error) {
            return false;
        }
    }
}

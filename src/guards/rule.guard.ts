import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/rules.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RuleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {
        const requeridRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requeridRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();

        const rolesFilted = requeridRoles.filter((role) => role === user.role);

        return rolesFilted.length > 0;
    }
}

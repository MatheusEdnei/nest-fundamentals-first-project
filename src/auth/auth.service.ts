/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly JwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) {}

    createToken(user: User) {
        return {
            acessToken: this.JwtService.sign({
              id: user.id,
              name: user.name,
              email: user.email,
          },
          {
              expiresIn: '7 days',
              subject: String(user.id),
              issuer: 'login',
              audience: 'users'  
          }
          )
        }
    }

    checkToken(token: string) {
        try {
            const data = this.JwtService.verify(token, {
              audience: 'users',
              issuer: 'login',
            });

            return data;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    isValidToken(token: string) {
        try {
          this.checkToken(token);
          return true;
        } catch(error) {
          return false;
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password,
            },
        });

        if (!user) {
            throw new UnauthorizedException('email or password are incorrect');
        }

        return this.createToken(user);
    }

    async forget(email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            throw new UnauthorizedException('email or password are incorrect');
        }

        // TODO: Send email
        return true;
    }

    async reset(password: string, token: string) {
        // TODO: Validate token
        const id = 0;
        const user = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            },
        });

        return this.createToken(user);
    }

    async register(data: AuthRegisterDTO) {
      const user = await this.userService.create(data);
      return this.createToken(user);
    }
}

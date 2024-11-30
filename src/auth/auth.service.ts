/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";
import { UserEntity } from "../user/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        private readonly JwtService: JwtService,
        private readonly userService: UserService,
        private readonly mailer: MailerService,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    createToken(user: UserEntity) {
        return {
            accessToken: this.JwtService.sign({
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

        const user = await this.usersRepository.findOneBy({
            email
        })

        if (!user) {
            throw new UnauthorizedException('email or password are incorrect');
        }

        const isEqualPassword = await bcrypt.compare(password, user.password);

        if (!isEqualPassword) {
          throw new UnauthorizedException('email or password are incorrect');
        }

        return this.createToken(user);
    }

    async forget(email: string) {
        const user = await this.usersRepository.findOneBy({
            email
        });

        if (!user) {
            throw new UnauthorizedException('email or password are incorrect');
        }

        const token = this.JwtService.sign({
            id: user.id,
        }, {
            expiresIn: '30 minutes',
            subject: String(user.id),
            issuer: 'forget',
            audience: 'users',
        })
        await this.mailer.sendMail({
            subject: 'Recuperação de Senha',
            to: 'ednei880@gmail.com',
            template: 'forget',
            context: {
                name: user.name,
                token,
            }

        })
        return true;
    }

    async reset(password: string, token: string) {
        try {
            const data = this.JwtService.verify(token, {
                audience: 'users',
                issuer: 'login',
            });

            const id = data.id;

            if(isNaN(Number(data.id))) {
                throw new UnauthorizedException('id or id is not a number');
            }

            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);

            await this.usersRepository.update(Number(data.id), {
                password,
            })

            const user = await this.userService.show(Number(data.id));

            return this.createToken(user);
        } catch (error) {
            throw new BadRequestException(error);
        }

    }

    async register(data: AuthRegisterDTO) {
      const user = await this.userService.create(data);
      return this.createToken(user);
    }
}

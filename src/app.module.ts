import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { UserEntity } from './user/entity/user.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: process.env.ENV === 'test' ? '.env.test' : '.env',
        }),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 10,
                ignoreUserAgents: [/googlebot/gi],
            },
        ]),
        MailerModule.forRoot({
            transport: {
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'eliezer.wyman35@ethereal.email',
                    pass: '6Ynw6j2zUeFghm8XuD',
                },
            },
            defaults: {
                from: '"nest-modules" <eliezer.wyman35@ethereal.email>',
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new PugAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [UserEntity],
            synchronize: process.env.NODE_ENV === 'development',
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}

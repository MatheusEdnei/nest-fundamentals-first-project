import {
    Body,
    Controller,
    Post,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    UploadedFiles,
    ParseFilePipe,
    FileTypeValidator,
    MaxFileSizeValidator,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import {
    FileFieldsInterceptor,
    FileInterceptor,
    FilesInterceptor,
} from '@nestjs/platform-express';
import { join } from 'path';
import { FileService } from '../file/file.service';
import { UserEntity } from '../user/entity/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly fileService: FileService,
    ) {}

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDTO) {
        return this.authService.reset(password, token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user: UserEntity) {
        return user;
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user: UserEntity,
        @UploadedFile() photo: Express.Multer.File,
    ) {
        const path = join(
            __dirname,
            '..',
            '..',
            'storage',
            'photos',
            `photo-${user.id}.png`,
        );

        try {
            await this.fileService.upload(photo, path);
        } catch (error) {
            throw new BadRequestException(error);
        }

        return photo;
    }
    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(
        @User() user,
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: 'image/*' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 20 }),
                ],
            }),
        )
        files: Express.Multer.File[],
    ) {
        return files;
    }

    @UseInterceptors(
        FileFieldsInterceptor([
            {
                name: 'photo',
                maxCount: 1,
            },
            {
                name: 'documents',
                maxCount: 10,
            },
        ]),
    )
    @UseGuards(AuthGuard)
    @Post('files-field')
    async uploadFilesFields(
        @User() user,
        @UploadedFiles()
        files: { photo: Express.Multer.File; documents: Express.Multer.File[] },
    ) {
        return files;
    }
}

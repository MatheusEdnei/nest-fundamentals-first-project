import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { AuthController } from './auth.controller';
import { authServiceMock } from '../testing/auth-service.mock';
import { fileServiceMock } from '../testing/file-service.mock';
import { authLoginDtoMock } from '../testing/auth-login-dto.mock';
import { accessToken } from '../testing/access-token.mock';
import { authRegisterDtoMock } from '../testing/auth-register-dto.mock';
import { authForgetDtoMock } from '../testing/auth-forget-dto.mock';
import { authResetDtoMock } from '../testing/auth-reset-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { getPhotoMock } from '../testing/get-photo.mock';

describe('AuthController', () => {
    let authController: AuthController;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [authServiceMock, fileServiceMock],
        })
            .overrideGuard(AuthGuard)
            .useValue(guardMock)
            .compile();

        authController = module.get<AuthController>(AuthController);
    });

    test('Validar a definição', () => {
        expect(authController).toBeDefined();
    });

    describe('Fluxo de autenticação', () => {
        test('login method', async () => {
            const result = await authController.login(authLoginDtoMock);
            expect(result).toEqual({ accessToken });
        });

        test('register method', async () => {
            const result = await authController.login(authRegisterDtoMock);
            expect(result).toEqual({ accessToken });
        });

        test('forget method', async () => {
            const result = await authController.forget(authForgetDtoMock);
            expect(result).toEqual({ success: true });
        });

        test('reset method', async () => {
            const result = await authController.reset(authResetDtoMock);
            expect(result).toEqual({ accessToken });
        });
    });

    describe('Rotas autenticadas', () => {
        test('me method', async () => {
            const result = await authController.me(userEntityList[0]);
            expect(result).toEqual(userEntityList[0]);
        });

        test('uploadPhoto method', async () => {
            const photo = await getPhotoMock();
            const result = await authController.uploadPhoto(
                userEntityList[0],
                photo,
            );
            expect(result).toEqual(photo);
        });
    });
});

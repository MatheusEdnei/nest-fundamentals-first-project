import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { accessToken } from '../testing/access-token.mock';
import { jwtPayload } from '../testing/jwtPayload.mock';
import { resetToken } from '../testing/reset-token.mock';
import { authRegisterDtoMock } from '../testing/auth-register-dto.mock';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                userRepositoryMock,
                jwtServiceMock,
                userServiceMock,
                mailerServiceMock,
            ],
        }).compile();
        authService = module.get<AuthService>(AuthService);
    });

    it('Validar a definição', () => {
        expect(authService).toBeDefined();
    });

    describe('Token', () => {
        it('Método createToken()', async () => {
            const result = authService.createToken(userEntityList[0]);
            expect(result).toEqual({ accessToken });
        });
        it('Método checkToken()', async () => {
            const result = await authService.checkToken(accessToken);
            expect(result).toEqual(jwtPayload);
        });
        it('Método isValidToken()', async () => {
            const result = authService.isValidToken(accessToken);
            expect(result).toEqual(true);
        });
    });

    describe('Autenticação', () => {
        it('Método login()', async () => {
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
            const result = await authService.login(
                userEntityList[0].email,
                '123456',
            );
            expect(result).toEqual({ accessToken });
        });

        it('Método forget()', async () => {
            const result = await authService.forget(userEntityList[0].email);
            expect(result).toEqual(true);
        });

        it('Método reset()', async () => {
            const result = await authService.reset('123456', resetToken);
            expect(result).toEqual({ accessToken });
        });

        it('Método register()', async () => {
            const result = await authService.register(authRegisterDtoMock);
            expect(result).toEqual({ accessToken });
        });
    });
});

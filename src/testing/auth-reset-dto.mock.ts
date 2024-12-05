import { AuthResetDTO } from '../auth/dto/auth-reset.dto';
import { resetToken } from './reset-token.mock';

export const authResetDtoMock: AuthResetDTO = {
    password: '654123',
    token: resetToken,
};

import { CreateUserDTO } from '../user/dto/create-user.dto';
import { Role } from '../enums/role.enum';

export const createUserDTO: CreateUserDTO = {
    birthAt: '2000-01-01',
    email: 'matheus@email.com',
    name: 'Matheus',
    password: '123456',
    role: Role.User,
};

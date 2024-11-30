import { UserEntity } from '../user/entity/user.entity';
import { Role } from '../enums/role.enum';

export const userEntityList: UserEntity[] = [
    {
        name: 'Matheus',
        email: 'matheus@email.com',
        birthAt: new Date('2000-01-01'),
        id: 1,
        password: '775b00a2-9a5a-4e02-8425-420ef7eb78f0',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: Role.User,
    },
    {
        name: 'Matheus Ednei',
        email: 'matheusednei@email.com',
        birthAt: new Date('2000-01-01'),
        id: 2,
        password: '775b00a2-9a5a-4e02-8425-420ef7eb78f0',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: Role.User,
    },
    {
        name: 'Matheus Souza',
        email: 'matheussouza@email.com',
        birthAt: new Date('2000-01-01'),
        id: 3,
        password: '775b00a2-9a5a-4e02-8425-420ef7eb78f0',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: Role.User,
    },
];

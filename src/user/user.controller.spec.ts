import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/user-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RuleGuard } from '../guards/rule.guard';
import { UserService } from './user.service';
import { userEntityList } from '../testing/user-entity-list.mock';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { updatePutUserDtoMock } from '../testing/update-put-user-dto.mock';
import { updatePatchUserDtoMock } from '../testing/update-patch-user-dto.mock';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [userServiceMock],
        })
            .overrideGuard(AuthGuard)
            .useValue(guardMock)
            .overrideGuard(RuleGuard)
            .useValue(guardMock)
            .compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    test('Validar a definição', () => {
        expect(userController).toBeDefined();
        expect(userService).toBeDefined();
    });

    describe('Teste da aplicação dos guards neste controle', () => {
        test('Se os guards estão aplicados', () => {
            const guards = Reflect.getMetadata('__guards__', UserController);
            expect(guards.length).toEqual(2);
            expect(new guards[0]()).toBeInstanceOf(AuthGuard);
            expect(new guards[1]()).toBeInstanceOf(RuleGuard);
        });
    });
    describe('Create', () => {
        test('method create', async () => {
            const result = await userService.create(createUserDTO);
            expect(result).toEqual(userEntityList[0]);
        });
    });

    describe('Read', () => {
        test('list create', async () => {
            const result = await userService.list();
            expect(result).toEqual(userEntityList);
        });

        test('show create', async () => {
            const result = await userService.show(1);
            expect(result).toEqual(userEntityList[0]);
        });
    });

    describe('Update', () => {
        test('update create', async () => {
            const result = await userService.update(1, updatePutUserDtoMock);
            expect(result).toEqual(userEntityList[0]);
        });

        test('updatePartial create', async () => {
            const result = await userService.updatePartial(
                1,
                updatePatchUserDtoMock,
            );
            expect(result).toEqual(userEntityList[0]);
        });
    });

    describe('Delete', () => {
        test('method delete', async () => {
            const result = await userService.delete(1);
            expect(result).toEqual({ success: true });
        });
    });
});

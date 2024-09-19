import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async create(data: CreateUserDTO) {
        const existEmail = await this.usersRepository.exist({
            where: {
                email: data.email,
            },
        });

        if (existEmail) {
            throw new BadRequestException('Email already exists');
        }
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        const user = this.usersRepository.create(data);

        return await this.usersRepository.save(user);
    }

    async list() {
        return await this.usersRepository.find();
    }

    async show(id: number) {
        await this.exists(id);
        return await this.usersRepository.findOneBy({
            id,
        });
    }

    async update(
        id: number,
        { email, name, password, birthAt, role }: UpdatePutUserDTO,
    ) {
        await this.exists(id);

        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);

        await this.usersRepository.update(id, {
            email,
            name,
            password,
            birthAt: birthAt ? new Date(birthAt) : null,
            role,
        });
        return this.show(id);
    }

    async updatePartial(
        id: number,
        { email, name, password, birthAt, role }: UpdatePatchUserDTO,
    ) {
        await this.exists(id);

        const data: any = {};

        if (birthAt) {
            data.birthAt = new Date(birthAt);
        }

        if (email) {
            data.email = email;
        }

        if (name) {
            data.name = name;
        }

        if (password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(password, salt);
        }

        if (role) {
            data.role = role;
        }

        await this.usersRepository.update(id, data);
        return this.show(id);
    }

    async delete(id: number) {
        await this.exists(id);
        return await this.usersRepository.delete(id);
    }

    async exists(id: number) {
        const exists = await this.usersRepository.exist({
            where: {
                id,
            },
        });
        if (!exists)
            throw new NotFoundException(`The user ${id} does not exists`);
    }
}

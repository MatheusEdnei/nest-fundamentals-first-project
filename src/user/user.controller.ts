import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Controller('users')
export class UserController {
    @Post()
    async create(@Body() { name, email, password }: CreateUserDTO) {
        return { name, email, password };
    }

    @Get()
    async read() {
        return { user: [] };
    }

    @Get(':id')
    async readOne(@Param() param) {
        return { user: {}, param };
    }

    @Put(':id')
    async update(@Body() { name, email, password }: UpdatePutUserDTO, @Param() param) {
        return {
            method: 'PUT',
            name,
            email,
            password,
            param,
        };
    }

    @Patch(':id')
    async updateParcial(@Body() body: UpdatePatchUserDTO, @Param() param) {
        return {
            method: 'PATCH',
            body,
            param,
        };
    }

    @Delete(':id')
    async delete(@Param() param) {
        return { param };
    }
}

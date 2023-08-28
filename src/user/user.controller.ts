import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

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
    async update(@Body() body, @Param() param) {
        return {
            method: 'PUT',
            body,
            param,
        };
    }

    @Patch(':id')
    async updateParcial(@Body() body, @Param() param) {
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

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
// import { CacheInterceptor } from 'src/interceptors/cache.interceptor';

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() data: CreateUserDTO) {
        return await this.userService.create(data);
    }

    @Get()
    async read() {
        return await this.userService.list();
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.show(id);
    }

    @Put(':id')
    async update(
        @Body() data: UpdatePutUserDTO,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.userService.update(id, data);
    }

    @Patch(':id')
    async updateParcial(
        @Body() data: UpdatePatchUserDTO,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.userService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.delete(id);
    }
}

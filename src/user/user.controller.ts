import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ParamId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/rules.decorator';
import { Role } from '../enums/role.enum';
import { RuleGuard } from '../guards/rule.guard';
import { AuthGuard } from '../guards/auth.guard';
@Roles(Role.Admin)
@UseGuards(AuthGuard, RuleGuard)
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
    async readOne(@ParamId() id: number) {
        console.log({ id });
        return await this.userService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
        return await this.userService.update(id, data);
    }

    @Patch(':id')
    async updateParcial(
        @Body() data: UpdatePatchUserDTO,
        @ParamId() id: number,
    ) {
        return await this.userService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return {
            success: await this.userService.delete(id),
        };
    }
}

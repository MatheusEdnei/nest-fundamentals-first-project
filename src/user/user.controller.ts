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
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/rules.decorator';
import { Role } from 'src/enums/role.enum';
import { RuleGuard } from 'src/guards/rule.guard';
import { AuthGuard } from 'src/guards/auth.guard';
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
        return await this.userService.delete(id);
    }
}

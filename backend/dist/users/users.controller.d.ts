import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '../entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): import("../entities/user.entity").User;
    findAll(): import("../entities/user.entity").User[];
    findOne(id: number): import("../entities/user.entity").User;
    update(id: number, updateUserDto: UpdateUserDto): import("../entities/user.entity").User;
    remove(id: number): {
        message: string;
    };
}

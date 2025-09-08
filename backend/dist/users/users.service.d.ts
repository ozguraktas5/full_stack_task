import { User, CreateUserDto, UpdateUserDto } from '../entities/user.entity';
export declare class UsersService {
    private users;
    private nextId;
    findAll(): User[];
    findOne(id: number): User;
    create(createUserDto: CreateUserDto): User;
    update(id: number, updateUserDto: UpdateUserDto): User;
    remove(id: number): void;
}

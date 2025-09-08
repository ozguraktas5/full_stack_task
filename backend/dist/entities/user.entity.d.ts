export declare class User {
    id: number;
    name: string;
    username: string;
    email: string;
    constructor(id: number, name: string, username: string, email: string);
}
export declare class CreateUserDto {
    name: string;
    username: string;
    email: string;
}
export declare class UpdateUserDto {
    name?: string;
    username?: string;
    email?: string;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = exports.CreateUserDto = exports.User = void 0;
class User {
    id;
    name;
    username;
    email;
    constructor(id, name, username, email) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
    }
}
exports.User = User;
class CreateUserDto {
    name;
    username;
    email;
}
exports.CreateUserDto = CreateUserDto;
class UpdateUserDto {
    name;
    username;
    email;
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=user.entity.js.map
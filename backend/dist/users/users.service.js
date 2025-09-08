"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
let UsersService = class UsersService {
    users = [
        new user_entity_1.User(1, 'Leanne Graham', 'Bret', 'Sincere@april.biz'),
        new user_entity_1.User(2, 'Ervin Howell', 'Antonette', 'Shanna@melissa.tv'),
        new user_entity_1.User(3, 'Clementine Bauch', 'Samantha', 'Nathan@yesenia.net'),
        new user_entity_1.User(4, 'Patricia Lebsack', 'Karianne', 'Julianne.OConner@kory.org'),
        new user_entity_1.User(5, 'Chelsey Dietrich', 'Kamren', 'Lucio_Hettinger@annie.ca'),
        new user_entity_1.User(6, 'Mrs. Dennis Schulist', 'Leopoldo_Corkery', 'Karley_Dach@jasper.info'),
        new user_entity_1.User(7, 'Kurtis Weissnat', 'Elwyn.Skiles', 'Telly.Hoeger@billy.biz'),
        new user_entity_1.User(8, 'Nicholas Runolfsdottir V', 'Maxime_Nienow', 'Sherwood@rosamond.me'),
        new user_entity_1.User(9, 'Glenna Reichert', 'Delphine', 'Chaim_McDermott@dana.io'),
        new user_entity_1.User(10, 'Clementina DuBuque', 'Moriah.Stanton', 'Rey.Padberg@karina.biz'),
    ];
    nextId = 11;
    findAll() {
        return this.users;
    }
    findOne(id) {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    create(createUserDto) {
        const newUser = new user_entity_1.User(this.nextId++, createUserDto.name, createUserDto.username, createUserDto.email);
        this.users.push(newUser);
        return newUser;
    }
    update(id, updateUserDto) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const user = this.users[userIndex];
        if (updateUserDto.name !== undefined)
            user.name = updateUserDto.name;
        if (updateUserDto.username !== undefined)
            user.username = updateUserDto.username;
        if (updateUserDto.email !== undefined)
            user.email = updateUserDto.email;
        return user;
    }
    remove(id) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        this.users.splice(userIndex, 1);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map
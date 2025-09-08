import { Injectable, NotFoundException } from '@nestjs/common';
import { User, CreateUserDto, UpdateUserDto } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    new User(1, 'Leanne Graham', 'Bret', 'Sincere@april.biz'),
    new User(2, 'Ervin Howell', 'Antonette', 'Shanna@melissa.tv'),
    new User(3, 'Clementine Bauch', 'Samantha', 'Nathan@yesenia.net'),
    new User(4, 'Patricia Lebsack', 'Karianne', 'Julianne.OConner@kory.org'),
    new User(5, 'Chelsey Dietrich', 'Kamren', 'Lucio_Hettinger@annie.ca'),
    new User(
      6,
      'Mrs. Dennis Schulist',
      'Leopoldo_Corkery',
      'Karley_Dach@jasper.info',
    ),
    new User(7, 'Kurtis Weissnat', 'Elwyn.Skiles', 'Telly.Hoeger@billy.biz'),
    new User(
      8,
      'Nicholas Runolfsdottir V',
      'Maxime_Nienow',
      'Sherwood@rosamond.me',
    ),
    new User(9, 'Glenna Reichert', 'Delphine', 'Chaim_McDermott@dana.io'),
    new User(
      10,
      'Clementina DuBuque',
      'Moriah.Stanton',
      'Rey.Padberg@karina.biz',
    ),
  ];

  private nextId = 11;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser = new User(
      this.nextId++,
      createUserDto.name,
      createUserDto.username,
      createUserDto.email,
    );
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const user = this.users[userIndex];
    if (updateUserDto.name !== undefined) user.name = updateUserDto.name;
    if (updateUserDto.username !== undefined)
      user.username = updateUserDto.username;
    if (updateUserDto.email !== undefined) user.email = updateUserDto.email;

    return user;
  }

  remove(id: number): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}

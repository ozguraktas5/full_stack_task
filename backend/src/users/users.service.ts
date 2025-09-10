import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, CreateUserDto, UpdateUserDto } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    
    // Eğer veritabanı boşsa, test verisi ekle
    if (users.length === 0) {
      const testUsers = [
        { name: 'Ahmet Yılmaz', username: 'ahmet', email: 'ahmet@example.com' },
        { name: 'Ayşe Demir', username: 'ayse', email: 'ayse@example.com' },
        { name: 'Mehmet Kaya', username: 'mehmet', email: 'mehmet@example.com' },
      ];
      
      for (const userData of testUsers) {
        const user = this.usersRepository.create(userData);
        await this.usersRepository.save(user);
      }
      
      return this.usersRepository.find();
    }
    
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, CreatePostDto, UpdatePostDto } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find();
    
    // Eğer veritabanı boşsa, test verisi ekle
    if (posts.length === 0) {
      const testPosts = [
        { userId: 1, title: 'İlk Post', body: 'Bu ilk test postudur.' },
        { userId: 1, title: 'React Hakkında', body: 'React öğrenmek çok eğlenceli!' },
        { userId: 2, title: 'NestJS Backend', body: 'NestJS ile backend geliştirme.' },
        { userId: 2, title: 'TypeScript', body: 'TypeScript kullanımı ve avantajları.' },
        { userId: 3, title: 'PostgreSQL', body: 'Veritabanı yönetimi ve sorgular.' },
      ];
      
      for (const postData of testPosts) {
        const post = this.postsRepository.create(postData);
        await this.postsRepository.save(post);
      }
      
      return this.postsRepository.find();
    }
    
    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async findByUserId(userId: number): Promise<Post[]> {
    return this.postsRepository.find({ where: { userId } });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postsRepository.remove(post);
  }
}
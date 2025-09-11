import { Repository } from 'typeorm';
import { Post, CreatePostDto, UpdatePostDto } from '../entities/post.entity';
export declare class PostsService {
    private postsRepository;
    constructor(postsRepository: Repository<Post>);
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    findByUserId(userId: number): Promise<Post[]>;
    create(createPostDto: CreatePostDto): Promise<Post>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<Post>;
    remove(id: number): Promise<void>;
}

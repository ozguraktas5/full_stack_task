import { Post, CreatePostDto, UpdatePostDto } from '../entities/post.entity';
export declare class PostsService {
    private posts;
    private nextId;
    findAll(): Post[];
    findOne(id: number): Post;
    findByUserId(userId: number): Post[];
    create(createPostDto: CreatePostDto): Post;
    update(id: number, updatePostDto: UpdatePostDto): Post;
    remove(id: number): void;
}

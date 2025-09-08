import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from '../entities/post.entity';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto): import("../entities/post.entity").Post;
    findAll(userId?: string): import("../entities/post.entity").Post[];
    findOne(id: number): import("../entities/post.entity").Post;
    update(id: number, updatePostDto: UpdatePostDto): import("../entities/post.entity").Post;
    remove(id: number): {
        message: string;
    };
}

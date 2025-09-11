import { User } from './user.entity';
export declare class Post {
    id: number;
    userId: number;
    title: string;
    body?: string;
    user: User;
}
export declare class CreatePostDto {
    userId: number;
    title: string;
    body?: string;
}
export declare class UpdatePostDto {
    userId?: number;
    title?: string;
    body?: string;
}

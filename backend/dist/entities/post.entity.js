"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostDto = exports.CreatePostDto = exports.Post = void 0;
class Post {
    id;
    userId;
    title;
    body;
    constructor(id, userId, title, body) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.body = body;
    }
}
exports.Post = Post;
class CreatePostDto {
    userId;
    title;
    body;
}
exports.CreatePostDto = CreatePostDto;
class UpdatePostDto {
    userId;
    title;
    body;
}
exports.UpdatePostDto = UpdatePostDto;
//# sourceMappingURL=post.entity.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const post_entity_1 = require("../entities/post.entity");
let PostsService = class PostsService {
    posts = [
        new post_entity_1.Post(1, 1, 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'),
        new post_entity_1.Post(2, 1, 'qui est esse', 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'),
        new post_entity_1.Post(3, 1, 'ea molestias quasi exercitationem repellat qui ipsa sit aut', 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'),
        new post_entity_1.Post(4, 1, 'eum et est occaecati', 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit'),
        new post_entity_1.Post(5, 1, 'nesciunt quas odio', 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque'),
        new post_entity_1.Post(6, 2, 'dolorem eum magni eos aperiam quia', 'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae'),
        new post_entity_1.Post(7, 2, 'magnam facilis autem', 'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas'),
        new post_entity_1.Post(8, 2, 'dolorem dolore est ipsam', 'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae'),
        new post_entity_1.Post(9, 2, 'nesciunt iure omnis dolorem tempora et accusantium', 'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas'),
        new post_entity_1.Post(10, 2, 'optio molestias id quia eum', 'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error'),
    ];
    nextId = 11;
    findAll() {
        return this.posts;
    }
    findOne(id) {
        const post = this.posts.find((post) => post.id === id);
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }
    findByUserId(userId) {
        return this.posts.filter((post) => post.userId === userId);
    }
    create(createPostDto) {
        const newPost = new post_entity_1.Post(this.nextId++, createPostDto.userId, createPostDto.title, createPostDto.body);
        this.posts.push(newPost);
        return newPost;
    }
    update(id, updatePostDto) {
        const postIndex = this.posts.findIndex((post) => post.id === id);
        if (postIndex === -1) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        const post = this.posts[postIndex];
        if (updatePostDto.userId !== undefined)
            post.userId = updatePostDto.userId;
        if (updatePostDto.title !== undefined)
            post.title = updatePostDto.title;
        if (updatePostDto.body !== undefined)
            post.body = updatePostDto.body;
        return post;
    }
    remove(id) {
        const postIndex = this.posts.findIndex((post) => post.id === id);
        if (postIndex === -1) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        this.posts.splice(postIndex, 1);
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)()
], PostsService);
//# sourceMappingURL=posts.service.js.map
import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, CreatePostDto, UpdatePostDto } from '../entities/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    new Post(
      1,
      1,
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    ),
    new Post(
      2,
      1,
      'qui est esse',
      'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    ),
    new Post(
      3,
      1,
      'ea molestias quasi exercitationem repellat qui ipsa sit aut',
      'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
    ),
    new Post(
      4,
      1,
      'eum et est occaecati',
      'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
    ),
    new Post(
      5,
      1,
      'nesciunt quas odio',
      'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
    ),
    new Post(
      6,
      2,
      'dolorem eum magni eos aperiam quia',
      'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
    ),
    new Post(
      7,
      2,
      'magnam facilis autem',
      'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas',
    ),
    new Post(
      8,
      2,
      'dolorem dolore est ipsam',
      'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae',
    ),
    new Post(
      9,
      2,
      'nesciunt iure omnis dolorem tempora et accusantium',
      'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas',
    ),
    new Post(
      10,
      2,
      'optio molestias id quia eum',
      'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error',
    ),
  ];

  private nextId = 11;

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  findByUserId(userId: number): Post[] {
    return this.posts.filter((post) => post.userId === userId);
  }

  create(createPostDto: CreatePostDto): Post {
    const newPost = new Post(
      this.nextId++,
      createPostDto.userId,
      createPostDto.title,
      createPostDto.body,
    );
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const post = this.posts[postIndex];
    if (updatePostDto.userId !== undefined) post.userId = updatePostDto.userId;
    if (updatePostDto.title !== undefined) post.title = updatePostDto.title;
    if (updatePostDto.body !== undefined) post.body = updatePostDto.body;

    return post;
  }

  remove(id: number): void {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    this.posts.splice(postIndex, 1);
  }
}

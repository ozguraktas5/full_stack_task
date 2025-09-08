export class Post {
  id: number;
  userId: number;
  title: string;
  body?: string;

  constructor(id: number, userId: number, title: string, body?: string) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }
}

export class CreatePostDto {
  userId: number;
  title: string;
  body?: string;
}

export class UpdatePostDto {
  userId?: number;
  title?: string;
  body?: string;
}

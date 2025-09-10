import React from 'react';
import { Link } from 'react-router-dom';
import { Post, User } from '../types';
import Avatar from './ui/Avatar';
import { Button } from './ui/Button';
import { EyeIcon, EditIcon, TrashIcon } from './ui/Icons';

interface PostCardProps {
  post: Post;
  user?: User;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, user, onEdit, onDelete }) => {
  const getUserName = (userId: number) => {
    return user?.name || `User ${userId}`;
  };

  return (
    <div className="post-card" data-post-id={post.id}>
      <div className="post-info">
        <div className="post-header">
          <Avatar name={user?.name || `User ${post.userId}`} size="md" />
          <div className="post-title-section">
            <div className="post-title-row">
              <h3>
                {post.title}
              </h3>
              <span className="post-id">#{post.id}</span>
            </div>
            <div className="post-details">
              <span className="author-name">{getUserName(post.userId)}</span>
              <span className="author-username">@{user?.username || `user${post.userId}`}</span>
              <span className="author-email">{user?.email || `user${post.userId}@example.com`}</span>
            </div>
          </div>
        </div>
      </div>

      {post.body && (
        <div className="post-body">
          <p>{post.body}</p>
        </div>
      )}

      <div className="post-actions">
        <Link 
          to={`/users`}
          className="btn btn-view-user btn-sm"
        >
          <EyeIcon size={14} />
          Kullanıcıyı Gör
        </Link>
        <Button 
          variant="default"
          size="sm"
          className="btn-edit"
          onClick={() => onEdit(post)}
        >
          <EditIcon size={14} />
          Düzenle
        </Button>
        <Button 
          variant="destructive"
          size="sm"
          onClick={() => onDelete(post)}
        >
          <TrashIcon size={14} />
          Sil
        </Button>
      </div>
    </div>
  );
};

export default PostCard;

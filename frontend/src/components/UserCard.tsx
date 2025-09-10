import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import Avatar from './ui/Avatar';
import { Button } from './ui/Button';
import { EyeIcon, EditIcon, TrashIcon } from './ui/Icons';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card" data-user-id={user.id}>
      <div className="user-info">
        <div className="user-header">
          <Avatar name={user.name} size="md" />
          <div className="user-name-section">
            <div className="user-name-row">
              <h3>
                {user.name}
                <span className="username">@{user.username}</span>
              </h3>
              <span className="user-id">#{user.id}</span>
            </div>
            <div className="user-details">
              <span className="email">{user.email}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="user-actions">
        <Link 
          to={`/posts?userId=${user.id}`}
          className="btn btn-view-posts btn-sm"
        >
          <EyeIcon size={14} />
          Postları Gör
        </Link>
        <Button 
          variant="default"
          size="sm"
          className="btn-edit"
          onClick={() => onEdit(user)}
        >
          <EditIcon size={14} />
          Düzenle
        </Button>
        <Button 
          variant="destructive"
          size="sm"
          onClick={() => onDelete(user)}
        >
          <TrashIcon size={14} />
          Sil
        </Button>
      </div>
    </div>
  );
};

export default UserCard;

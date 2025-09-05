import React, { useState, useEffect } from 'react';
import { Post, CreatePostData, UpdatePostData, User } from '../types';

interface PostFormProps {
  post?: Post | null;
  users: User[];
  onSubmit: (data: CreatePostData | UpdatePostData) => void;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, users, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    userId: 0,
    title: '',
    body: '',
  });

  useEffect(() => {
    if (post) {
      setFormData({
        userId: post.userId,
        title: post.title,
        body: post.body || '',
      });
    } else if (users.length > 0) {
      setFormData(prev => ({
        ...prev,
        userId: users[0].id,
      }));
    }
  }, [post, users]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'userId' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Lütfen post başlığını girin');
      return;
    }

    if (formData.userId === 0) {
      alert('Lütfen bir kullanıcı seçin');
      return;
    }

    if (post) {
      onSubmit({ ...formData, id: post.id } as UpdatePostData);
    } else {
      onSubmit(formData as CreatePostData);
    }
  };

  return (
    <div className="post-form">
      <h2>{post ? 'Post Düzenle' : 'Yeni Post Ekle'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">Kullanıcı:</label>
          <select
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="user-select"
          >
            <option value={0}>Kullanıcı seçin</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} (@{user.username})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Başlık:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Post başlığını girin"
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">İçerik (Opsiyonel):</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Post içeriğini girin"
            rows={4}
            className="post-textarea"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            İptal
          </button>
          <button type="submit" className="submit-btn">
            {post ? 'Güncelle' : 'Ekle'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

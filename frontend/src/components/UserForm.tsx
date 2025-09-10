import React, { useState, useEffect } from 'react';
import { User, CreateUserData, UpdateUserData } from '../types';

interface UserFormProps {
  user?: User | null;
  onSubmit: (data: CreateUserData | UpdateUserData) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.username.trim() || !formData.email.trim()) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    if (!formData.email.includes('@')) {
      alert('Lütfen geçerli bir email adresi girin');
      return;
    }

    if (user) {
      onSubmit({ ...formData, id: user.id } as UpdateUserData);
    } else {
      onSubmit(formData as CreateUserData);
    }
  };

  return (
    <div className="user-form">
      <h2>{user ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ad Soyad"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Kullanıcı Adı"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            İptal
          </button>
          <button type="submit" className="submit-btn">
            {user ? 'Güncelle' : 'Ekle'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

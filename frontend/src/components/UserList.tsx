import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, CreateUserData, UpdateUserData } from '../types';
import { userApi } from '../services/api';
import UserForm from './UserForm';
import './UserList.css';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.getAll();
      setUsers(data);
    } catch (err) {
      setError('Kullanıcılar yüklenirken hata oluştu');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData: CreateUserData) => {
    try {
      const newUser = await userApi.create(userData);
      setUsers([...users, newUser]);
      setShowForm(false);
    } catch (err) {
      setError('Kullanıcı oluşturulurken hata oluştu');
      console.error('Error creating user:', err);
    }
  };

  const handleUpdateUser = async (userData: UpdateUserData) => {
    try {
      const updatedUser = await userApi.update(userData);
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setEditingUser(null);
    } catch (err) {
      setError('Kullanıcı güncellenirken hata oluştu');
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      try {
        await userApi.delete(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        setError('Kullanıcı silinirken hata oluştu');
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  if (loading) {
    return (
      <div className="user-list">
        <div className="loading">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h1>👥 Kullanıcı Listesi</h1>
        <div className="header-actions">
          <Link to="/" className="back-link">← Ana Sayfa</Link>
          <button 
            className="add-button"
            onClick={() => setShowForm(true)}
          >
            + Yeni Kullanıcı
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <UserForm
              user={editingUser}
              onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}

      <div className="user-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p className="username">@{user.username}</p>
              <p className="email">{user.email}</p>
              <p className="user-id">ID: {user.id}</p>
            </div>
            <div className="user-actions">
              <Link 
                to={`/posts?userId=${user.id}`}
                className="view-posts-btn"
              >
                Postları Görüntüle
              </Link>
              <button 
                className="edit-btn"
                onClick={() => handleEditUser(user)}
              >
                Düzenle
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDeleteUser(user.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && !loading && (
        <div className="empty-state">
          <p>Henüz kullanıcı bulunmuyor.</p>
          <button 
            className="add-button"
            onClick={() => setShowForm(true)}
          >
            İlk Kullanıcıyı Ekle
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;

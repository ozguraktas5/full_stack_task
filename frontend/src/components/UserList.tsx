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
      setEditingUser(null); // Editing user'ı temizle
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
      setShowForm(false); // Form'u kapat
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
      <div className="loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list-container">
        <div className="user-list-header">
          <Link to="/" className="back-link">← Ana Sayfa</Link>
          <div className="header-title">
            <div className="header-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Kullanıcı Listesi</h1>
          </div>
          <button 
            className="add-button"
            onClick={() => {
              setEditingUser(null);
              setShowForm(true);
            }}
          >
            + Yeni Kullanıcı
          </button>
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
              <h3>
                {user.name}
                <span className="username">@{user.username}</span>
              </h3>
              <div className="user-details">
                <span className="email">{user.email}</span>
                <span className="user-id">ID: {user.id}</span>
              </div>
            </div>
            <div className="user-actions">
              <Link 
                to={`/posts?userId=${user.id}`}
                className="view-posts-btn"
                style={{ 
                  background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)', 
                  color: 'white' 
                }}
              >
                Postları Görüntüle
              </Link>
              <button 
                className="edit-btn"
                onClick={() => handleEditUser(user)}
                style={{ 
                  background: 'linear-gradient(90deg, #9C27B0 0%, #E1BEE7 100%)', 
                  color: 'white' 
                }}
              >
                Düzenle
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDeleteUser(user.id)}
                style={{ 
                  background: 'linear-gradient(90deg, #F44336 0%, #FF5722 100%)', 
                  color: 'white' 
                }}
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
    </div>
  );
};

export default UserList;

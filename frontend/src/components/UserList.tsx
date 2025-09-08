import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { User, CreateUserData, UpdateUserData } from '../types';
import { userApi } from '../services/api';
import UserForm from './UserForm';
import SearchBar from './SearchBar';
import SkeletonCard from './SkeletonCard';
import Navigation from './Navigation';
import ToastContainer from './ToastContainer';
import ConfirmModal from './ConfirmModal';
import { useToast } from '../hooks/useToast';
import '../styles/UserList.css';
import '../styles/components.css';
import '../styles/navigation.css';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { toasts, showSuccess, showError, removeToast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

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
      setEditingUser(null);
      showSuccess('Kullanıcı başarıyla oluşturuldu!');
    } catch (err) {
      showError('Kullanıcı oluşturulurken hata oluştu');
      console.error('Error creating user:', err);
    }
  };

  const handleUpdateUser = async (userData: UpdateUserData) => {
    try {
      const updatedUser = await userApi.update(userData);
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setEditingUser(null);
      setShowForm(false);
      showSuccess('Kullanıcı başarıyla güncellendi!');
    } catch (err) {
      showError('Kullanıcı güncellenirken hata oluştu');
      console.error('Error updating user:', err);
    }
  };

  const handleSubmit = async (data: CreateUserData | UpdateUserData) => {
    if (editingUser) {
      await handleUpdateUser(data as UpdateUserData);
    } else {
      await handleCreateUser(data as CreateUserData);
    }
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      await userApi.delete(userToDelete.id);
      setUsers(users.filter(user => user.id !== userToDelete.id));
      showSuccess('Kullanıcı başarıyla silindi!');
    } catch (err) {
      showError('Kullanıcı silinirken hata oluştu');
      console.error('Error deleting user:', err);
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const cancelDeleteUser = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
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
        <div className="user-list-container">
          <Navigation />
          <div className="user-list-header">
            <div className="header-title">
              <div className="header-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1>Kullanıcı Listesi</h1>
            </div>
          </div>
          <div className="user-grid">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} type="user" />
            ))}
          </div>
        </div>
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list-container">
        <Navigation />
        
        <div className="user-list-header">
          <div className="header-top">
            <div className="header-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Kullanıcı Listesi</h1>
          </div>
          
          <div className="header-search">
            <SearchBar
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
          
          <div className="header-actions">
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
              onSubmit={handleSubmit}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}

        <div className="user-grid">
          {filteredUsers.map(user => (
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
                onClick={() => handleDeleteUser(user)}
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
      
      <ToastContainer toasts={toasts} onClose={removeToast} />
      
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Kullanıcıyı Sil"
        message={`"${userToDelete?.name}" kullanıcısını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
        confirmText="Evet, Sil"
        cancelText="İptal"
        onConfirm={confirmDeleteUser}
        onCancel={cancelDeleteUser}
        type="danger"
      />
    </div>
  );
};

export default UserList;

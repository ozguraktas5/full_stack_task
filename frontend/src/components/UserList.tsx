import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { User, CreateUserData, UpdateUserData } from '../types';
import { userApi } from '../services/api';
import UserForm from './UserForm';
import { Input } from './ui/Input';
import { EyeIcon, EditIcon, TrashIcon, PlusIcon } from './ui/Icons';
import SkeletonCard from './SkeletonCard';
import Navigation from './Navigation';
import ToastContainer from './ToastContainer';
import ConfirmModal from './ConfirmModal';
import { useToast } from '../hooks/useToast';
import { Button } from './ui/Button';
import Avatar from './ui/Avatar';
import '../styles/UserList.css';
import '../styles/components.css';
import '../styles/navigation.css';
import '../styles/ui/Button.css';
import '../styles/ui/Avatar.css';
import '../styles/ui/Input.css';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
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

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  // Pagination functions
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
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
            <Input
              type="text"
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="search"
              className="search-input-modern"
            />
          </div>
          
          <div className="header-actions">
            <Button 
              className="add-button-custom"
              onClick={() => {
                setEditingUser(null);
                setShowForm(true);
              }}
            >
              <PlusIcon size={18} />
              Yeni Kullanıcı
            </Button>
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
          {currentUsers.length > 0 ? (
            currentUsers.map(user => (
            <div key={user.id} className="user-card" data-user-id={user.id}>
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
                  onClick={() => handleEditUser(user)}
                >
                  <EditIcon size={14} />
                  Düzenle
                </Button>
                <Button 
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteUser(user)}
                >
                  <TrashIcon size={14} />
                  Sil
                </Button>
              </div>
            </div>
          ))
          ) : searchTerm ? (
            <div className="no-results">
              <div className="no-results-content">
                <div className="no-results-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Gösterilecek Kullanıcı Yok</h3>
                <p>"{searchTerm}" araması için sonuç bulunamadı.</p>
                <button 
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                >
                  Aramayı Temizle
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <div className="pagination-info">
              <span>
                {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} / {filteredUsers.length} kullanıcı
              </span>
            </div>
            
            <div className="pagination-controls">
              <button 
                className="pagination-btn"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}
              
              <button 
                className="pagination-btn"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          </div>
        )}

        {users.length === 0 && !loading && (
          <div className="empty-state">
            <p>Henüz kullanıcı bulunmuyor.</p>
            <Button 
              className="add-button-custom"
              onClick={() => setShowForm(true)}
            >
              <PlusIcon size={18} />
              İlk Kullanıcıyı Ekle
            </Button>
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

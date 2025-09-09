import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Post, CreatePostData, UpdatePostData, User } from '../types';
import { postApi, userApi } from '../services/api';
import PostForm from './PostForm';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import Avatar from './ui/Avatar';
import { EyeIcon, EditIcon, TrashIcon, PlusIcon } from './ui/Icons';
import '../styles/ui/Input.css';
import '../styles/ui/Button.css';
import '../styles/ui/Avatar.css';
import SkeletonCard from './SkeletonCard';
import Navigation from './Navigation';
import ToastContainer from './ToastContainer';
import ConfirmModal from './ConfirmModal';
import { useToast } from '../hooks/useToast';
import '../styles/PostList.css';
import '../styles/components.css';
import '../styles/navigation.css';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchParams] = useSearchParams();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const { toasts, showSuccess, showError, removeToast } = useToast();

  useEffect(() => {
    const userId = searchParams.get('userId');
    if (userId) {
      setSelectedUserId(parseInt(userId));
    }
    loadData();
  }, [searchParams]);

  // Filter posts based on search term
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;
    
    return posts.filter(post => {
      // Sadece post title'ında arama yap
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [posts, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load users and posts in parallel
      const [usersData, postsData] = await Promise.all([
        userApi.getAll(),
        selectedUserId ? postApi.getByUserId(selectedUserId) : postApi.getAll()
      ]);
      
      setUsers(usersData);
      setPosts(postsData);
    } catch (err) {
      setError('Veriler yüklenirken hata oluştu');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUserName = (userId: number): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `Kullanıcı ${userId}`;
  };

  const handleCreatePost = async (postData: CreatePostData) => {
    try {
      const newPost = await postApi.create(postData);
      setPosts([...posts, newPost]);
      setShowForm(false);
      setEditingPost(null);
      showSuccess('Post başarıyla oluşturuldu!');
    } catch (err) {
      showError('Post oluşturulurken hata oluştu');
      console.error('Error creating post:', err);
    }
  };

  const handleUpdatePost = async (postData: UpdatePostData) => {
    try {
      const updatedPost = await postApi.update(postData);
      setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
      setEditingPost(null);
      setShowForm(false);
      showSuccess('Post başarıyla güncellendi!');
    } catch (err) {
      showError('Post güncellenirken hata oluştu');
      console.error('Error updating post:', err);
    }
  };

  const handleDeletePost = (post: Post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDeletePost = async () => {
    if (!postToDelete) return;
    
    try {
      await postApi.delete(postToDelete.id);
      setPosts(posts.filter(post => post.id !== postToDelete.id));
      showSuccess('Post başarıyla silindi!');
    } catch (err) {
      showError('Post silinirken hata oluştu');
      console.error('Error deleting post:', err);
    } finally {
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const cancelDeletePost = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
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

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  const handleUserFilter = (userId: number | null) => {
    setSelectedUserId(userId);
    if (userId) {
      loadPostsByUser(userId);
    } else {
      loadAllPosts();
    }
  };

  const loadPostsByUser = async (userId: number) => {
    try {
      setLoading(true);
      const data = await postApi.getByUserId(userId);
      setPosts(data);
    } catch (err) {
      setError('Kullanıcı postları yüklenirken hata oluştu');
      console.error('Error loading posts by user:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAllPosts = async () => {
    try {
      setLoading(true);
      const data = await postApi.getAll();
      setPosts(data);
    } catch (err) {
      setError('Postlar yüklenirken hata oluştu');
      console.error('Error loading all posts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="post-list">
        <div className="post-list-container">
          <Navigation />
          <div className="post-list-header">
            <div className="header-title">
              <div className="header-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1>Post Listesi</h1>
            </div>
          </div>
          <div className="post-grid">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} type="post" />
            ))}
          </div>
        </div>
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    );
  }

  return (
    <div className="post-list">
      <div className="post-list-container">
        <Navigation />
        
        <div className="post-list-header">
          <div className="header-top">
            <div className="header-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Post Listesi</h1>
          </div>
          
          <div className="header-search">
            <Input
              type="text"
              placeholder="Post ara..."
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
                setEditingPost(null);
                setShowForm(true);
              }}
            >
              <PlusIcon size={16} />
              Yeni Post
            </Button>
          </div>
        </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="filter-section">
        <label htmlFor="user-filter">Kullanıcıya Göre Filtrele:</label>
        <select 
          id="user-filter"
          value={selectedUserId || ''} 
          onChange={(e) => handleUserFilter(e.target.value ? parseInt(e.target.value) : null)}
          className="user-filter"
        >
          <option value="">Tüm Postlar</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} (@{user.username})
            </option>
          ))}
        </select>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <PostForm
              post={editingPost}
              users={users}
              onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}

      <div className="post-grid">
        {currentPosts.length > 0 ? (
          currentPosts.map(post => {
            const user = users.find(u => u.id === post.userId);
            return (
              <div key={post.id} className="post-card" data-post-id={post.id}>
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
                    onClick={() => handleEditPost(post)}
                  >
                    <EditIcon size={14} />
                    Düzenle
                  </Button>
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePost(post)}
                  >
                    <TrashIcon size={14} />
                    Sil
                  </Button>
                </div>
              </div>
            );
          })
        ) : searchTerm ? (
          <div className="no-results">
            <div className="no-results-content">
              <div className="no-results-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Gösterilecek Post Yok</h3>
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
                {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} / {filteredPosts.length} post
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

      {posts.length === 0 && !loading && (
        <div className="empty-state">
          <p>
            {selectedUserId 
              ? `${getUserName(selectedUserId)} kullanıcısının henüz postu bulunmuyor.`
              : 'Henüz post bulunmuyor.'
            }
          </p>
          <Button 
            className="add-button-custom"
            onClick={() => {
              setEditingPost(null);
              setShowForm(true);
            }}
          >
            <PlusIcon size={16} />
            İlk Postu Ekle
          </Button>
        </div>
      )}
      </div>
      
      <ToastContainer toasts={toasts} onClose={removeToast} />
      
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Postu Sil"
        message={`"${postToDelete?.title}" postunu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
        confirmText="Evet, Sil"
        cancelText="İptal"
        onConfirm={confirmDeletePost}
        onCancel={cancelDeletePost}
        type="danger"
      />
    </div>
  );
};

export default PostList;

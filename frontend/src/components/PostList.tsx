import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Post, CreatePostData, UpdatePostData, User } from '../types';
import { postApi, userApi } from '../services/api';
import PostForm from './PostForm';
import './PostList.css';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchParams] = useSearchParams();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    const userId = searchParams.get('userId');
    if (userId) {
      setSelectedUserId(parseInt(userId));
    }
    loadData();
  }, [searchParams]);

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
      setEditingPost(null); // Editing post'u temizle
    } catch (err) {
      setError('Post oluşturulurken hata oluştu');
      console.error('Error creating post:', err);
    }
  };

  const handleUpdatePost = async (postData: UpdatePostData) => {
    try {
      const updatedPost = await postApi.update(postData);
      setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
      setEditingPost(null);
      setShowForm(false); // Form'u kapat
    } catch (err) {
      setError('Post güncellenirken hata oluştu');
      console.error('Error updating post:', err);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (window.confirm('Bu postu silmek istediğinizden emin misiniz?')) {
      try {
        await postApi.delete(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (err) {
        setError('Post silinirken hata oluştu');
        console.error('Error deleting post:', err);
      }
    }
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
      <div className="loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      <div className="post-list-container">
        <div className="post-list-header">
          <Link to="/" className="back-link">← Ana Sayfa</Link>
          <div className="header-title">
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
          <button 
            className="add-button"
            onClick={() => {
              setEditingPost(null);
              setShowForm(true);
            }}
          >
            + Yeni Post
          </button>
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
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <h3>{post.title}</h3>
              <span className="post-id">#{post.id}</span>
            </div>
            
            <div className="post-meta">
              <div className="user-info">
                <div className="profile-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="user-label">Yazar:</span>
                <span className="user-name">{getUserName(post.userId)}</span>
                <span className="user-id">(ID: {post.userId})</span>
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
                className="view-user-btn"
                style={{
                  background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)',
                  color: 'white'
                }}
              >
                Kullanıcıyı Görüntüle
              </Link>
              <button 
                className="edit-btn"
                onClick={() => handleEditPost(post)}
                style={{
                  background: 'linear-gradient(90deg, #9C27B0 0%, #E1BEE7 100%)',
                  color: 'white'
                }}
              >
                Düzenle
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDeletePost(post.id)}
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

      {posts.length === 0 && !loading && (
        <div className="empty-state">
          <p>
            {selectedUserId 
              ? `${getUserName(selectedUserId)} kullanıcısının henüz postu bulunmuyor.`
              : 'Henüz post bulunmuyor.'
            }
          </p>
          <button 
            className="add-button"
            onClick={() => {
              setEditingPost(null);
              setShowForm(true);
            }}
          >
            İlk Postu Ekle
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default PostList;

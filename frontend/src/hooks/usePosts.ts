import { useState, useCallback } from 'react';
import { Post, CreatePostData, UpdatePostData } from '../types';
import { postApi } from '../services/api';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAllPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await postApi.getAll();
      setPosts(data);
    } catch {
      setError('Postlar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPostsByUser = useCallback(async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await postApi.getByUserId(userId);
      setPosts(data);
    } catch {
      setError('Kullanıcı postları yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (postData: CreatePostData): Promise<Post> => {
    const newPost = await postApi.create(postData);
    setPosts(prev => [...prev, newPost]);
    return newPost;
  }, []);

  const updatePost = useCallback(async (postData: UpdatePostData): Promise<Post> => {
    const updatedPost = await postApi.update(postData);
    setPosts(prev => prev.map(post => post.id === updatedPost.id ? updatedPost : post));
    return updatedPost;
  }, []);

  const deletePost = useCallback(async (postId: number): Promise<void> => {
    await postApi.delete(postId);
    setPosts(prev => prev.filter(post => post.id !== postId));
  }, []);

  return {
    posts,
    loading,
    error,
    loadAllPosts,
    loadPostsByUser,
    createPost,
    updatePost,
    deletePost,
    setError,
  };
};

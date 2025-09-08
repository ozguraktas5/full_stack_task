import axios from 'axios';
import { User, Post, CreateUserData, CreatePostData, UpdateUserData, UpdatePostData } from '../types';

const API_BASE_URL = 'http://localhost:3002';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data, error.message);
    return Promise.reject(error);
  }
);

// User API functions
export const userApi = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  // Get user by ID
  getById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // Create new user
  create: async (userData: CreateUserData): Promise<User> => {
    const response = await api.post<User>('/users', userData);
    return response.data;
  },

  // Update user
  update: async (userData: UpdateUserData): Promise<User> => {
    const response = await api.patch<User>(`/users/${userData.id}`, userData);
    return response.data;
  },

  // Delete user
  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Post API functions
export const postApi = {
  // Get all posts
  getAll: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>('/posts');
    return response.data;
  },

  // Get posts by user ID
  getByUserId: async (userId: number): Promise<Post[]> => {
    const response = await api.get<Post[]>(`/posts?userId=${userId}`);
    return response.data;
  },

  // Get post by ID
  getById: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },

  // Create new post
  create: async (postData: CreatePostData): Promise<Post> => {
    const response = await api.post<Post>('/posts', postData);
    return response.data;
  },

  // Update post
  update: async (postData: UpdatePostData): Promise<Post> => {
    const response = await api.patch<Post>(`/posts/${postData.id}`, postData);
    return response.data;
  },

  // Delete post
  delete: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },
};
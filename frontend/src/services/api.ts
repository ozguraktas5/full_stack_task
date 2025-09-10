import axios, { AxiosError } from 'axios';
import { User, Post, CreateUserData, CreatePostData, UpdateUserData, UpdatePostData } from '../types';

// Error types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Handle different HTTP status codes
    switch (axiosError.response?.status) {
      case 400:
        return {
          message: 'Geçersiz istek. Lütfen girdiğiniz bilgileri kontrol edin.',
          status: 400,
          code: 'BAD_REQUEST',
        };
      case 401:
        return {
          message: 'Yetkisiz erişim. Lütfen giriş yapın.',
          status: 401,
          code: 'UNAUTHORIZED',
        };
      case 403:
        return {
          message: 'Bu işlem için yetkiniz bulunmuyor.',
          status: 403,
          code: 'FORBIDDEN',
        };
      case 404:
        return {
          message: 'Aranan kaynak bulunamadı.',
          status: 404,
          code: 'NOT_FOUND',
        };
      case 409:
        return {
          message: 'Bu kaynak zaten mevcut.',
          status: 409,
          code: 'CONFLICT',
        };
      case 422:
        return {
          message: axiosError.response?.data?.message || 'Girilen veriler geçersiz.',
          status: 422,
          code: 'VALIDATION_ERROR',
        };
      case 500:
        return {
          message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
          status: 500,
          code: 'INTERNAL_SERVER_ERROR',
        };
      default:
        return {
          message: axiosError.response?.data?.message || axiosError.message || 'Bir hata oluştu',
          status: axiosError.response?.status,
          code: axiosError.code,
        };
    }
  }
  
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }
  
  return {
    message: 'Bilinmeyen bir hata oluştu',
  };
};

const API_BASE_URL = 'http://localhost:3002';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
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
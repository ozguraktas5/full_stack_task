import { useState, useEffect, useCallback } from 'react';
import { User, CreateUserData, UpdateUserData } from '../types';
import { userApi } from '../services/api';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await userApi.getAll();
      setUsers(usersData);
    } catch {
      setError('Kullanıcılar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (userData: CreateUserData): Promise<User> => {
    const newUser = await userApi.create(userData);
    setUsers(prev => [...prev, newUser]);
    return newUser;
  }, []);

  const updateUser = useCallback(async (userData: UpdateUserData): Promise<User> => {
    const updatedUser = await userApi.update(userData);
    setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
    return updatedUser;
  }, []);

  const deleteUser = useCallback(async (userId: number): Promise<void> => {
    await userApi.delete(userId);
    setUsers(prev => prev.filter(user => user.id !== userId));
  }, []);

  return {
    users,
    loading,
    error,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    setError,
  };
};

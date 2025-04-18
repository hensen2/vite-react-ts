import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { api } from './api';

export type Auth = {
  isAuthenticated: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export const checkAuth = async (): Promise<Auth> => {
  return await api.get('/auth/status');
};

export const login = (credentials: LoginCredentials): Promise<Auth> => {
  return api.post('/auth/login', { ...credentials });
};

export const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

export const authQueryOptions = queryOptions({
  queryKey: ['auth'],
  queryFn: checkAuth,
});

export const useAuth = () => {
  return useQuery(authQueryOptions);
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (data): void => {
      queryClient.setQueryData(authQueryOptions.queryKey, data);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: (): void => {
      queryClient.setQueryData(authQueryOptions.queryKey, {
        isAuthenticated: false,
      });
    },
  });
};

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { error } = useAuth();
  if (error) {
    toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    });
  }
  return <>{children}</>;
};

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useGetMe, useRefreshToken } from '../services/auth.service';
import { redirect, usePathname } from 'next/navigation';
import { User, Users } from '../types/user';
import  cookies  from 'js-cookie';
import { useGetUsers } from '../services/users.sevice';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  refreshGetMe: () => void,
  allUsers: Users,
  refreshGetUsers: () => void,
  getUsersLoading: boolean

}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  user: any; // Replace `any` with the actual user type if available
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const {data: MeDate,refetch: refreshGetMe, isPending, isError, error} = useGetMe(); 
  const {mutateAsync: refreshToken, data: refreshTokenData, isPending:refreshTokenLoading, isError:refreshTokenIsError, error: refreshTokenError} = useRefreshToken()
  const isAuthenticated = !!user;

  
  const { data: users, refetch: refreshGetUsers, isLoading: getUsersLoading, error: GetUsersError } = useGetUsers();

  const allUsers = users?.data;

  useEffect(() => {
      if(MeDate && pathname !== "/") {
        redirect("/");
      }
      setUser(MeDate?.data);
  
    return () => {
      
    }
  }, [MeDate, pathname])

  useEffect(() => {
    const token = cookies.get("refreshToken")
    if(error !== null && token) {
      refreshToken(token).then(data => {
        if(data?.data) {
          cookies.set("accessToken", data.data?.['accessToken']);
        }
      })
      // .finally(() => refreshGetMe())
    }
  return () => {
    
  };
}, [error]);

  return (
    <AuthContext.Provider value={{ user,refreshGetMe, isAuthenticated, allUsers, refreshGetUsers, getUsersLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}



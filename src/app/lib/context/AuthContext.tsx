import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useGetMe } from '../services/auth.service';
import { redirect, usePathname } from 'next/navigation';
import { User } from '../types/user';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  refreshGetMe: () => void
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

  const isAuthenticated = !!user;

  useEffect(() => {
      if(MeDate && pathname !== "/") {
        redirect("/");
      }
      setUser(MeDate?.data);
  
    return () => {
      
    }
  }, [MeDate, pathname])
  
  return (
    <AuthContext.Provider value={{ user,refreshGetMe, isAuthenticated }}>
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



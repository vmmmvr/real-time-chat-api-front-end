// src/providers/ReactQueryProvider.tsx
"use client";
import { AuthProvider } from "@/app/lib/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AppProvider } from "../context/AppContext";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,  // Disable refetch on window focus globally
      retry: 2,                     // Example: Retry failed queries twice
      // staleTime: 1000 * 60 * 5, 
    },
    mutations: {
      retry: 2,
    }
  }
});

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>{children}</AuthProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

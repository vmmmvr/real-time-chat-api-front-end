// src/providers/ReactQueryProvider.tsx
"use client";
import { AuthProvider } from "@/app/lib/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AppProvider } from "../context/AppContext";

export const queryClient = new QueryClient();

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

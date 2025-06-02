// src/features/auth/useAuth.ts
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user ?? null,
    session,
    loading: status === "loading",
    isAuthenticated: status === "authenticated",
    signIn,
    signOut,
  };
}

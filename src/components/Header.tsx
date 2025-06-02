// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center mb-8">
      <h2 className="text-xl font-semibold">Stripe Shop</h2>
      <nav className="space-x-4">
        {session ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={() => signOut()} className="text-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

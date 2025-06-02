// src/app/layout.tsx (updated)
import "../styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import AuthContext from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Stripe Payment Scenarios",
  description:
    "Clean and simple Stripe integration with login and subscriptions",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#edf2f4] text-[#2b2d42]">
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}

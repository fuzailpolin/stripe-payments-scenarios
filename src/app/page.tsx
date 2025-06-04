"use client";

import { useEffect, useState } from "react";
import { ProductWithPrice } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import SubscriptionButton from "@/components/SubscriptionButton";
import { useAuth } from "@/features/auth/useAuth";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import ProductCarousel from "../components/ProductCarousel";

export default function HomePage() {
  const [products, setProducts] = useState<ProductWithPrice[]>([]);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Our Products</h1>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <span className="mr-2">Hello, {user?.email ?? "User"}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      <ProductCarousel />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const priceAmount = product.price?.unit_amount;
          const safeProduct = {
            id: product.id,
            name: product.name,
            description: product.description ?? "No description available",
            price: priceAmount ? priceAmount / 100 : 0, // Convert cents to dollars
          };

          return (
            <ProductCard key={safeProduct.id} product={safeProduct}>
              {isAuthenticated ? (
                <SubscriptionButton productId={product.id} />
              ) : (
                <p className="text-red-600">Please login to subscribe</p>
              )}
            </ProductCard>
          );
        })}
      </div>
    </main>
  );
}

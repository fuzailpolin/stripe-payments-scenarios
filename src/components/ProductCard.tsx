// src/components/ProductCard.tsx
import { ReactNode } from "react";
import { formatCurrency } from "@/utils/formatCurrency";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
  };
  children?: ReactNode;
}

export default function ProductCard({ product, children }: ProductCardProps) {
  return (
    <div className="border border-gray-300 rounded-2xl p-4 bg-white shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-700 mb-2">
        {product.description ?? "No description available"}
      </p>
      <p className="font-bold mb-4">{formatCurrency(product.price)}</p>
      {children}
    </div>
  );
}

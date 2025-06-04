// src/types/product.d.ts
import Stripe from "stripe";

export interface ProductWithPrice {
  id: string;
  name: string;
  description: string | null;
  image: string;
  price: Stripe.Price | undefined;
}

export interface ProductInfo {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
}

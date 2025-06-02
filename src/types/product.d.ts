// src/types/product.d.ts
import Stripe from "stripe";

export interface ProductWithPrice {
  id: string;
  name: string;
  description: string | null;
  image: string;
  price: Stripe.Price | undefined;
}

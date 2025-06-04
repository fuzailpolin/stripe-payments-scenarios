// src/data/products.ts

import { ProductInfo } from "../types/product";

export const products: ProductInfo[] = [
  {
    id: "1",
    name: "Sample Product 1",
    image: "https://placehold.co/400x400",
    price: 20,
    originalPrice: 25,
    discount: "-20%",
    rating: 5,
  },
  {
    id: "2",
    name: "Sample Product 2",
    image: "https://placehold.co/400x400",
    price: 20,
    rating: 5,
  },
  {
    id: "3",
    name: "Sample Product 3",
    image: "https://placehold.co/400x400",
    price: 17,
    originalPrice: 20,
    discount: "-15%",
    rating: 4,
  },
];

// src/components/ProductCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
};

const products: Product[] = [
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

export default function ProductCarousel() {
  return (
    <div className="w-full px-4 py-8">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Navigation, Pagination]}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden relative group">
              {product.discount && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-10">
                  {product.discount}
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                unoptimized
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex justify-center items-center my-1">
                  {"★".repeat(product.rating)}
                  {"☆".repeat(5 - product.rating)}
                </div>
                <div className="space-x-2">
                  {product.originalPrice && (
                    <span className="line-through text-gray-500 text-sm">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-orange-600 font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-sm">
                  Add to cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

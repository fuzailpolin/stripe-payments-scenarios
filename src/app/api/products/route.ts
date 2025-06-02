// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { getProducts } from "@/services/stripeService";

export async function GET() {
  try {
    const products = await getProducts();
    console.log(products);
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}

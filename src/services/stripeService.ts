// src/services/stripeService.ts
import { stripe } from "@/lib/stripe";

export async function getProducts() {
  const products = await stripe.products.list({
    active: true,
  });

  // Get prices for each product
  const productsWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
        limit: 1,
      });
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0] || "",
        price: prices.data[0],
      };
    })
  );
  return productsWithPrices;
}

import { notFound } from "next/navigation";
import BuyNowProductInfo from "@/components/BuyNowProductInfo";
import BuyNowStripePayment from "@/components/BuyNowStripePayment";
import { products } from "@/data/product";

interface BuyPageProps {
  params: { productId: string };
}

export default async function BuyPage({ params }: BuyPageProps) {
  const product = products.find((p) => {
    return parseInt(p.id) === parseInt(params.productId);
  });

  if (!product) return notFound();

  return (
    <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <BuyNowProductInfo product={product} />
      <BuyNowStripePayment amount={product.price} />
    </main>
  );
}

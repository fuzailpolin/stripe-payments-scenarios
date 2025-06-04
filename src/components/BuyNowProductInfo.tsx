import { formatCurrency } from "@/utils/formatCurrency";
import { ProductInfo } from "../types/product";
import Image from "next/image";

export default function BuyNowProductInfo({
  product,
}: {
  product: ProductInfo;
}) {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        unoptimized
      />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-xl font-semibold">{formatCurrency(product.price)}</p>
    </div>
  );
}

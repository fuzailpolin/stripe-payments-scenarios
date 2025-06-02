// src/features/checkout/CheckoutForm.tsx
"use client";

import { useState } from "react";
import { useCheckout } from "./useCheckout";

export default function CheckoutForm({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false);
  const { createCheckoutSession } = useCheckout();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await createCheckoutSession(priceId);
    if (result?.url) {
      window.location.href = result.url;
    } else {
      alert("Checkout failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        disabled={loading}
        className="bg-[#2b2d42] text-white px-4 py-2 rounded-xl hover:bg-[#8d99ae]"
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </form>
  );
}

// src/features/checkout/useCheckout.ts
export function useCheckout() {
  async function createCheckoutSession(priceId: string) {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Checkout error", error);
      return null;
    }
  }

  return {
    createCheckoutSession,
  };
}

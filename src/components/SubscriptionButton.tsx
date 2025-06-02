"use client";

export default function SubscriptionButton({
  productId,
}: {
  productId: string;
}) {
  const handleSubscribe = async () => {
    console.log("subs button", productId);
    const res = await fetch("/api/stripe/subscribe", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Subscription failed");
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className="bg-[#2b2d42] text-white px-4 py-2 rounded-xl hover:bg-[#8d99ae]"
    >
      Subscribe
    </button>
  );
}

"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <CheckCircle className="text-green-500 w-16 h-16" />
        <h1 className="text-3xl font-bold text-green-700">
          Payment Successful!
        </h1>
        <p className="text-gray-700">
          Thank you for your purchase. A confirmation email has been sent to
          you.
        </p>
        <Link
          href="/"
          className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getProductPrices } from "@/services/stripeService";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { productId } = body;

  //Map your productId to Stripe priceId here or fetch from DB

  const price = await getProductPrices(productId);

  if (!productId) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  try {
    // Create Stripe Checkout Session
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: price.id, quantity: 1 }],
      customer_email: session.user?.email || undefined,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}?canceled=true`,
    });

    console.log(stripeSession);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Store subscription attempt (you can customize your schema)
    await db.collection("subscriptions").insertOne({
      userEmail: session.user?.email,
      productId,
      priceId: price.id,
      stripeSessionId: stripeSession.id,
      status: "pending", // mark as pending until webhook confirms success
      createdAt: new Date(),
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

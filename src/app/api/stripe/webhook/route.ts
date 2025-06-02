/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import clientPromise from "@/lib/mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const buf = await req.arrayBuffer();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf),
      sig,
      webhookSecret
    );
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const client = await clientPromise;
  const db = client.db();
  const subscriptionsCollection = db.collection("subscriptions");

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;

        await subscriptionsCollection.updateOne(
          { stripeSessionId: session.id },
          {
            $set: {
              status: "active",
              subscriptionId: session.subscription,
              updatedAt: new Date(),
            },
          }
        );

        console.log("Subscription activated:", session.id);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as any;

        await subscriptionsCollection.updateOne(
          { subscriptionId: invoice.subscription },
          {
            $set: {
              status: "payment_failed",
              updatedAt: new Date(),
            },
          }
        );

        console.log("Payment failed for subscription:", invoice.subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as any;

        await subscriptionsCollection.updateOne(
          { subscriptionId: subscription.id },
          {
            $set: {
              status: "cancelled",
              updatedAt: new Date(),
            },
          }
        );

        console.log("Subscription cancelled:", subscription.id);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (dbError) {
    console.error("Database error handling webhook:", dbError);
    return new Response(
      `Webhook handler error: ${(dbError as Error).message}`,
      {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      }
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

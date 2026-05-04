import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@sanity/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy");

// Initialize Sanity client
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  try {
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || "whsec_dummy"
    );

    // Handle checkout session completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      // Parse items from metadata
      const items = JSON.parse(session.metadata.items || "[]");

      // Create order in Sanity
      await sanity.create({
        _type: "order",
        customerEmail: session.customer_details?.email || session.customer_email,
        customerName: session.metadata.customerName || "",
        status: "paid",
        total: session.amount_total / 100, // Convert from cents
        stripeSessionId: session.id,
        items: items.map((item: any) => ({
          productName: item.name,
          productId: item._id,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: "", // Can be extended with customer address from Stripe
      });

      console.log(`Order created for session ${session.id}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}

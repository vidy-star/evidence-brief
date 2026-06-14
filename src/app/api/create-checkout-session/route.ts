import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

/**
 * Creates a Stripe Checkout Session for the $29.95 CAD one-time purchase.
 *
 * Required environment variables (.env.local):
 * - STRIPE_SECRET_KEY       — server-side secret key (sk_test_... or sk_live_...)
 * - STRIPE_PRICE_ID         — one-time Price ID for $29.95 CAD (price_...)
 * - NEXT_PUBLIC_APP_URL     — base URL for success/cancel redirects
 *
 * STRIPE_PRICE_ID setup:
 * 1. Stripe Dashboard → Products → Create product (e.g. "Hearing Package")
 * 2. Add a one-time price: $29.95 CAD
 * 3. Copy the Price ID (price_...) into STRIPE_PRICE_ID in .env.local
 */
export async function POST() {
  try {
    const priceId = process.env.STRIPE_PRICE_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!priceId) {
      return NextResponse.json(
        {
          error:
            "STRIPE_PRICE_ID is not configured. Add your one-time price ID to .env.local.",
        },
        { status: 500 }
      );
    }

    if (!appUrl) {
      return NextResponse.json(
        {
          error:
            "NEXT_PUBLIC_APP_URL is not configured. Add it to .env.local.",
        },
        { status: 500 }
      );
    }

    // STRIPE_SECRET_KEY is validated inside getStripe()
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancel`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("create-checkout-session error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}

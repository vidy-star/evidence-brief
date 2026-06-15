import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Verifies a completed Stripe Checkout Session after redirect to /success.
 *
 * Requires STRIPE_SECRET_KEY in .env.local.
 */
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing session_id parameter." },
      { status: 400 }
    );
  }

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        {
          error:
            "STRIPE_SECRET_KEY is not configured. Add your secret key to .env.local.",
        },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.status !== "complete" || session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Checkout session is not complete." },
        { status: 400 }
      );
    }

    if (session.mode !== "payment") {
      return NextResponse.json(
        { error: "Checkout session is not a one-time payment." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      active: true,
      // Stored locally to unlock generation after a one-time purchase.
      subscriptionId: session.id,
      customerId:
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id ?? "",
    });
  } catch (error) {
    console.error("verify-checkout-session error:", error);
    return NextResponse.json(
      { error: "Failed to verify checkout session." },
      { status: 500 }
    );
  }
}

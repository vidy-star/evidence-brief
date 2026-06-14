import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

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
    const stripe = getStripe();
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

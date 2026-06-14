import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

/**
 * Checks whether a stored one-time purchase (checkout session) is still valid.
 *
 * Requires STRIPE_SECRET_KEY in .env.local.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { subscriptionId?: string };
    const sessionId = body.subscriptionId;

    if (!sessionId) {
      return NextResponse.json(
        { error: "subscriptionId is required." },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const active =
      session.mode === "payment" &&
      session.status === "complete" &&
      session.payment_status === "paid";

    return NextResponse.json({ active });
  } catch (error) {
    console.error("subscription-status error:", error);
    return NextResponse.json(
      { error: "Failed to verify purchase status." },
      { status: 500 }
    );
  }
}

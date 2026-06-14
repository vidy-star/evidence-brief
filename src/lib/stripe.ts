import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Returns the server-side Stripe client.
 *
 * Requires STRIPE_SECRET_KEY in .env.local (sk_test_... or sk_live_...).
 * Get it from: Stripe Dashboard → Developers → API keys → Secret key
 */
export function getStripe(): Stripe {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      throw new Error(
        "STRIPE_SECRET_KEY is required. Add your Stripe secret key to .env.local."
      );
    }

    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

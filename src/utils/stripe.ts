// Stripe utility functions
import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export const getStripePublishableKey = (): string => {
  return process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';
};

const { getStripe } = require("../utils/get-stripe");

const getStripeCheckoutSession = (userEmail, planId) => {
  const stripe = getStripe();
  // See https://stripe.com/docs/api/checkout/sessions/create
  // for additional parameters to pass.

  const params = {
    mode: "subscription",
    payment_method_types: ["card"],
    // We will use this to know which user paid
    subscription_data: {
      items: [{ plan: planId }],
    },
    // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
    // the actual Session ID is returned in the query parameter when your customer
    // is redirected to the success page.
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
  };

  params.customer_email = userEmail;
  return stripe.checkout.sessions.create(params);
};

module.exports = { getStripeCheckoutSession };

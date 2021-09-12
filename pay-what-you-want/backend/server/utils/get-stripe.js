const { Stripe } = require("stripe");
const getStripe = () => {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: "2020-08-27",
    typescript: true,
  });
  return stripe;
};

module.exports = { getStripe };

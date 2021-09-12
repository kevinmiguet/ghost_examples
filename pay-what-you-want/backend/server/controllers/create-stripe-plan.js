const { getStripe } = require("../utils/get-stripe");

const createStripePlan = (amount, planType) => {
  const stripe = getStripe();
  return stripe.plans.create({
    currency: process.env.CURRENCY_CODE,
    interval:
      planType == "monthly"
        ? "month"
        : planType === "yearly"
        ? "year"
        : "month",
    active: true,
    amount,
    trial_period_days: process.env.NB_TRIAL_DAYS,
    product: process.env.STRIPE_PRODUCT_ID,
  });
};

module.exports = { createStripePlan };

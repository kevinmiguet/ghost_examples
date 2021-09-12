const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const {
  getStripeCheckoutSession,
} = require("./controllers/get-stripe-checkout-session");
const port = 1987;
const cors = require("cors");
const { createStripePlan } = require("./controllers/create-stripe-plan");
const {
  cancelStripeSubscription,
} = require("./controllers/cancel-stripe-subscription");
const app = express;

const server = express();

server.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
server.use(cors());

server.use(
  bodyParser.urlencoded({
    parameterLimit: 10000,
    limit: "500mb",
    extended: true,
  })
);
server.use(
  bodyParser.json({
    parameterLimit: 10000,
    limit: "500mb",
    extended: true,
  })
);
server.use(express.json());

//
// ROUTES
//

server.get("/api/test", (req, res) => {
  res.send({ it: "works", baby: "!" });
});

// Get stripe session
server.post("/api/get-stripe-session", async (req, res) => {
  const price = req.body.price * 100; // price is sent in cents to stripe
  const planType = req.body.plan;

  if (!price || (planType !== "monthly" && planType !== "yearly")) {
    return res.status(403).send({ message: "Server error, please try again" });
  }
  const minimumPrice =
    planType == "monthly"
      ? process.env.MINIMUM_PRICE_MONTHLY
      : process.env.MINIMUM_PRICE_YEARLY;

  if (price < minimumPrice) {
    return res.status(403).send({
      message: `Please pay a minimum of ${minimumPrice}${process.env.CURRENCY_SYMBOL}`,
    });
  }
  const plan = await createStripePlan(price, planType);
  const sessionId = await getStripeCheckoutSession(req.body.email, plan.id);
  return res.send({ url: sessionId.url });
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`Listening on PORT: ${port}`);
});

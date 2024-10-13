const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const stripe = Stripe(
  "sk_test_51Q9N102Kpn5vGTA14oaF1e8Q6DMHZViDh8pGYIUJQq2OAVApPJ0FSOjC6tsEqqjTPyko0YbVQmoJinPQlN39hKBy005aHXewyB"
);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { plan } = req.body;
  console.log("hi");

  let price;
  if (plan === "Premium Plan") {
    price = "price_1Q9Q2f2Kpn5vGTA1oaYTyo3W";
  } else {
    price = "0";
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1Q9Q2f2Kpn5vGTA1oaYTyo3W",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://your-site.com/success",
    cancel_url: "https://your-site.com/cancel",
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log("Server running on port 4242"));

// pages/api/razorpay.js
import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { amount, currency } = req.body;

    try {
      // Initialize Razorpay instance
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID, // add this in .env.local
        key_secret: process.env.RAZORPAY_KEY_SECRET, // add this in .env.local
      });

      // Create order options
      const options = {
        amount: amount * 100, // Amount in smallest currency unit
        currency,
        receipt: "receipt_order_12345",
      };

      // Create order
      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

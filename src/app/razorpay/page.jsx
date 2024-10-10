'use client'
import { useState } from "react";

export default function page() {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("INR");

  const handlePayment = async () => {
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency }),
    });
    const data = await res.json();

    if (data.id) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use Public Key
        amount: data.amount,
        currency: data.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: data.id, // Order ID from backend API
        handler: (response) => {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      alert("Failed to create Razorpay order");
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
}

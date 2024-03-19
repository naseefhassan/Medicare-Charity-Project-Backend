const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RazorPay_Key_Id,
  key_secret: process.env.RazorPay_Secert_Key,
});

const CreateOrder = async (req, res) => {
  try {
  const options = {
    amount: 50000, // amount in the smallest currency unit (e.g., paisa for INR)
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: 0,
  };

    const response = await razorpay.orders.create(options);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = CreateOrder;

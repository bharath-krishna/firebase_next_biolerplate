import crypto from "crypto";
export default async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const digest = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${orderCreationId}|${razorpayPaymentId}`)
      .digest("hex");

    if (digest !== razorpaySignature) {
      res.statusCode = 500;
      res.json("Transaction is not legit");
      return;
    }

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.statusCode = 500;
    res.json(error);
  }
};

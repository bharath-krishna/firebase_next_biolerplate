import Razorpay from "razorpay";

export default async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: 1500,
      currency: "INR",
      receipt: "random_string_use_shortid",
    };

    const order = await instance.orders.create(options);

    if (!order) {
      res.statusCode = 500;
      res.json("Some error occurred");
      console.log("no order");
      return;
    }

    res.json(order);
  } catch (error) {
    res.statusCode = 500;
    console.log(error);
    res.json(error);
  }
};

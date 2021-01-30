import { verifyIdToken } from "../../utils/NextFirebaseAuth";
import shortid from "shortid";
import Razorpay from "razorpay";

export default async (req, res) => {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({ error: "Missing Authorization header" });
  }
  const token = req.headers.authorization;

  try {
    await verifyIdToken(token);
  } catch (e) {
    return res.status(401).json({ error: "Unuthorized" });
  }

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: 1500,
      currency: "INR",
      receipt: shortid.generate(),
    };

    const order = await instance.orders.create(options);

    if (!order) {
      res.statusCode = 500;
      res.json({ error: "No order" });
    }

    res.json(order);
  } catch (error) {
    res.statusCode = 500;
    res.json({ error: error });
  }
};

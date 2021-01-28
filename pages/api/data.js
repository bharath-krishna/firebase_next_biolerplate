import firebase from "../../utils/firebaseClient";
import { verifyIdToken } from "../../utils/NextFirebaseAuth";

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

  // Update below line with collection name
  const collectionName = "somename";

  const data = await firebase.firestore().collection(collectionName).get();

  res.statusCode = 200;
  // res.json(data.docs.map((doc) => doc.data()));
  res.json([{ Name: "SomeData" }, { Name: "SomeOtherData" }]);
};

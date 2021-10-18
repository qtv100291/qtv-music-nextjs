import jwt from "jsonwebtoken";
import connectMongoDB from "../../../utils/connectMongoDB";

export default async function handler(req, res) {
  if (req.method !== "PATCH") return;
  const { address, payment } = req.body;
  const [schema, token] = req.headers.authorization.split(" ");
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  try {
    const decode = jwt.verify(token, secretKey);
    const { email } = decode.data;
    const client = await connectMongoDB("usersData");
    const userCollection = await client.db().collection("users");
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    await userCollection.updateOne({ email }, { $set: { address, payment } });
    return res.status(200).json({ message: "User Updated" });
  } catch (err) {
    if (err.name === "MongoServerError")
      return res.status(500).json({ message: "server error" });
    return res.status(401).json({ message: err.message });
  }
}

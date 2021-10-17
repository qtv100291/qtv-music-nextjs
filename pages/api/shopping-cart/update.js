import fs from "fs";
import jwt from 'jsonwebtoken'
import connectMongoDB from "../../../utils/connectMongoDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const { shoppingCart } = req.body;
  const [schema, token] = req.headers.authorization.split(" ");
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  try {
    const decode = jwt.verify(token, secretKey);
    const { email } = decode.data;
    const client = await connectMongoDB("usersData");
    const userCollection = await client.db().collection("users");
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    await userCollection.updateOne(
      { email },
      { $set: { shoppingCart } }
    );
    client.close()
    return res.status(200).json("Shopping cart updated")
  } catch (err) {
    res.status(403).json(err.message);
  }
}

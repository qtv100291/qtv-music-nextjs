import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import connectMongoDB from "../../../utils/connectMongoDB";

export default async function handler(req, res) {
  if (req.method !== "GET") return;
  const [schema, token] = req.headers.authorization.split(" ");
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY
  try {
    const decode = jwt.verify(token, secretKey);
    const { email } = decode.data;
    const client = await connectMongoDB("usersData");
    const userCollection = await client.db().collection("users");
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    delete user.password
    // console.log("user")
    res.status(200).json(user);
  } catch (err) {
    // console.log(err)
    res.status(401).json({ message: err.message });
  }
}

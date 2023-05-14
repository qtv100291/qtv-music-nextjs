import addfunc from "../../../utils/additionalFunction";
import jwt from "jsonwebtoken";
import connectMongoDB from "../../../utils/connectMongoDB";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const { userInfo } = req.body;
  const [schema, token] = req.headers.authorization.split(" ");
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  try {
    const decode = jwt.verify(token, secretKey);
    const { email } = decode.data;
    const client = await connectMongoDB("usersData");
    const clientOrder = await connectMongoDB("ordersData");
    const userCollection = await client.db().collection("users");
    const orderCollection = await clientOrder.db().collection("orders");
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const shoppingCart = user.shoppingCart;
    const tradeHistory = addfunc.buildHistoryTrade(shoppingCart);
    const orderInfo = new addfunc.GetPaymentInfo(userInfo, shoppingCart);
    await orderCollection.insertOne(orderInfo);
    await userCollection.updateOne(
      { email },
      { $push: { tradeHistory: { $each: tradeHistory } } }
    );

    client.close();

    // axios.post("https://qtv-music-shop-send-email.herokuapp.com/send-confirmation-email", {
    //   clientEmail: user.email,
    //   order: orderInfo,
    // });

    return res
      .status(200)
      .json({ tradeHistory: [...user.tradeHistory, ...tradeHistory] });
  } catch (err) {
    console.log(err);
    if (err.name === "MongoServerError")
      return res.status(500).json({ message: "server error" });
    return res.status(401).json({ message: err.message });
  }
}

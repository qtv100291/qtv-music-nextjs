import fs from "fs";
import path from "path";
import addfunc from "../../../utils/additionalFunction";
import jwt from 'jsonwebtoken'
import sendEmailConfirmation from "../../../utils/sendEmailConfirmation";
import connectMongoDB from "../../../utils/connectMongoDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const { userInfo } = req.body;
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const filePathOrder = path.join(process.cwd(), "data", "order.json");
  const fileDataOrder = fs.readFileSync(filePathOrder);
  const dataOrder = JSON.parse(fileDataOrder);
  const [schema, token] = req.headers.authorization.split(" ");
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  try {
    const decode = jwt.verify(token, secretKey);
    const { email } = decode.data;
    const client = await connectMongoDB("usersData");
    const clientOrder = await connectMongoDB("ordersData")
    const userCollection = await client.db().collection("users");
    const orderCollection = await client.db().collection("orders");
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    for (let i = 0; i < data.users.length; i++) {
      if (data.users[i].id === id) {
        const shoppingCart = JSON.parse(JSON.stringify(data.users[i].shoppingCart));
        const tradeHistory = addfunc.buildHistoryTrade(shoppingCart);
        const orderInfo = new addfunc.GetPaymentInfo(userInfo, shoppingCart)
        dataOrder.order.push(orderInfo)
        fs.writeFileSync(filePathOrder, JSON.stringify(dataOrder));
        data.users[i].tradeHistory.push(...tradeHistory);
        data.users[i].shoppingCart = []
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(200).json({ tradeHistory: [...data.users[i].tradeHistory] });
        sendEmailConfirmation(data.users[i].email, orderInfo)
      }
    }
  } catch (err) {
    return res.status(401).json({message:err.message});
  }
}


import hashPassword from "../../../utils/hashPassword";
import connectMongoDB from "../../../utils/connectMongoDB";
import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const { email, password, name, phone } = req.body;
  try {
    const client = await connectMongoDB("usersData");
    const existingEmail = await client.db().collection("users").findOne({ email });
    // console.log(existingEmail)
    if (existingEmail)
      return res.status(409).json({ message: "Your email is already used" });
    const hashedPassword = await hashPassword(password);
    const newUser = {
      email,
      password: hashedPassword,
      platform: "web",
      name,
      refreshToken: "",
      phone: phone || "",
      shoppingCart: [],
      avatar: "",
      address: {
        province: "",
        district: "",
        commune: "",
        street: "",
      },
      payment: {
        cardType: "",
        cardNumber: "",
        cardOwner: "",
        cardExpireDate: "",
        cardCvv: "",
      },
      tradeHistory: [],
    };
    await client.db().collection("users").insertOne(newUser);
    res.status(200).json({ message: "Created User" });
    axios.post("https://qtv-music-shop-send-email.herokuapp.com/send-welcome-email", {
        clientEmail: email,
      });
    client.close()
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
}

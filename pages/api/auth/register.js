import fs from "fs";
import path from "path";
import hashPassword from "../../../utils/hashPassword";
import { v4 as uuidv4 } from "uuid";
import sendWelcomeEmail from "../../../utils/sendWelcomeEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const { email, password, name, phone } = req.body;

  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].email === email)
      return res.status(409).json({ message: "Your email is already used" });
  }

  const hashedPassword = await hashPassword(password);
  const id = uuidv4();
  const newUser = {
    id,
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
  data.users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(data));
  sendWelcomeEmail(email)
  res.status(200).json({ message: "Created User" });
}

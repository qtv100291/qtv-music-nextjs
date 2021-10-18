import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import jwtDecode from "jwt-decode";
import generateToken from "../../../utils/generateToken";
import connectMongoDB from "../../../utils/connectMongoDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  // const filePath = path.join(process.cwd(), "data", "users.json");
  // const fileData = fs.readFileSync(filePath);
  // const data = JSON.parse(fileData);
  const { googleAccessToken } = req.body;
  const userData = jwtDecode(googleAccessToken);

  const { name, email, sub: userID, picture } = userData;
  try {
    const client = await connectMongoDB("usersData");
    const userCollection = await client.db().collection("users");
    const user = await userCollection.findOne({ email });
    if (!user) {
      const newUser = {
        userID,
        email,
        password: "",
        platform: "google",
        refreshToken: "",
        name,
        phone: "",
        shoppingCart: [],
        avatar: picture,
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
      const returnInfo = await userCollection.insertOne(newUser);
      const payload = {
        email,
        id: returnInfo.insertedId.valueOf(),
      };
      const [tokenKey, refreshTokenKey] = generateToken(payload);
      
      res
        .status(200)
        .json({ accessToken: tokenKey, refreshToken: refreshTokenKey });
    }
    if (user.platform !== "google") {
      return res.status(409).json({ message: "Your email is already used" });
    }
  } catch (err) {}
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].email === email)
      if (data.users[i].platform !== "google")
        return res.status(409).json({ message: "Your email is already used" });
      else {
        const payload = {
          email: data.users[i].email,
          id: data.users[i].id,
        };
        const [tokenKey, refreshTokenKey] = generateToken(payload);
        data.users[i].refreshToken = refreshTokenKey;
        fs.writeFileSync(filePath, JSON.stringify(data));
        return res
          .status(200)
          .json({ accessToken: tokenKey, refreshToken: refreshTokenKey });
      }
  }

  newUser.refreshToken = refreshTokenKey;
  data.users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(data));

  return res
    .status(200)
    .json({ accessToken: tokenKey, refreshToken: refreshTokenKey });
}

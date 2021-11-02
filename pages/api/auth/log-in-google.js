import jwtDecode from "jwt-decode";
import generateToken from "../../../utils/generateToken";
import connectMongoDB from "../../../utils/connectMongoDB";
import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== "POST") return;
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
      await userCollection.updateOne(
        { email },
        { $set: { refreshToken: refreshTokenKey } }
      );
      axios.post("https://qtv-music-shop-send-email.herokuapp.com/send-welcome-email", {
        clientEmail: email,
      });
      return res
        .status(200)
        .json({ accessToken: tokenKey, refreshToken: refreshTokenKey });
    }
    if (user.platform !== "google") {
      return res.status(409).json({ message: "Your email is already used" });
    }
    const payload = {
      email,
      id: user._id.valueOf(),
    };
    const [tokenKey, refreshTokenKey] = generateToken(payload);
    await userCollection.updateOne(
      { email },
      { $set: { refreshToken: refreshTokenKey } }
    );
    client.close()
    return res
      .status(200)
      .json({ accessToken: tokenKey, refreshToken: refreshTokenKey });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "server error" });
  }
}

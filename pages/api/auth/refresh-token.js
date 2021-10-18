import connectMongoDB from "../../../utils/connectMongoDB";
import jwt from "jsonwebtoken";
import generateToken from "../../../utils/generateToken";

export default async function refreshToken(req, res) {
  if (req.method !== "POST") return;

  const secretRefreshKey = process.env.NEXT_PUBLIC_JWT_SECRET_REFRESH_KEY;
  const { refreshToken } = req.body;
  try {
    const decode = jwt.verify(refreshToken, secretRefreshKey);
    const { email } = decode.data;
    const client = await connectMongoDB("usersData");
    const userCollection = await client.db().collection("users");
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const payload = {
      email: data.users[i].email,
      id: user._id.valueOf(),
    };
    const [tokenKey, refreshTokenKey] = generateToken(payload);
    client.close();
    return res
      .status(200)
      .json({ accessToken: tokenKey, refreshToken: refreshTokenKey });
  } catch (err) {
    if (err.name === "MongoServerError")
      return res.status(500).json({ message: "server error" });
    res.status(403).json({ message: err.message });
  }
}

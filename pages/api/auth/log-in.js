import { comparePassword } from "../../../utils/hashPassword";
import generateToken from "../../../utils/generateToken";
import connectMongoDB from "../../../utils/connectMongoDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const { email, password } = req.body;
  try {
    const client = await connectMongoDB("usersData");
    const userCollection = await client.db().collection("users");
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.platform !== "web") {
      return res.status(409).json({
        message: `Email này được liên kết với tài khoản ${user.platform}, xin hãy đăng nhập qua ${user.platform} `,
      });
    }
    const isValid = await comparePassword(password, user.password);
    if (isValid) {
      const payload = {
        email,
        id: user._id.valueOf(),
      };
      const [tokenKey, refreshTokenKey] = generateToken(payload);
      await userCollection.updateOne(
        { email },
        { $set: { refreshToken: refreshTokenKey } }
      );
      client.close();
      return res
        .status(200)
        .json({ accessToken: tokenKey, refreshToken: refreshTokenKey });
    } else return res.status(401).json({ message: "Password incorrect" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
}

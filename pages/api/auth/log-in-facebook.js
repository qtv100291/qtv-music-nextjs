import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { axiosFb } from "../../../services/httpService";
import { getDataFacebook } from "../../../services/facebookService";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const appFbID = process.env.NEXT_PUBLIC_FB_APP_ID;
  const appSecret = process.env.NEXT_PUBLIC_FB_APP_SECRET;
  // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow?locale=en_US#checktoken
  //Generate App Access Token
  const { data: appAccessToken } = await axiosFb.get(
    `/oauth/access_token?client_id=${appFbID}&client_secret=${appSecret}&grant_type=client_credentials`
  );
  // console.log(appAccessToken);
  //check access token is valid
  const { accessToken, userID } = req.body;
  const { data: dataToken } = await axiosFb.get(
    `/debug_token?input_token=${accessToken}&access_token=${appAccessToken.access_token}`
  );
  console.log("dataToken", dataToken);
  // get user data from facebook
  const option = `/${userID}?fields=id,name,email&access_token=${accessToken}`;
  const { data: userData } = await getDataFacebook(option);
  console.log("userData", userData);
  // check user id and app id
  const { user_id, app_id } = dataToken.data;

  if (user_id !== userID || app_id !== appFbID)
    return res.status(403).json("Facebook token not valid");

  //If token facebook is valid

  const { name, email } = userData;

  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].email === email)
      if (data.users[i].platform !== "facebook")
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
  const id = uuidv4();
  const newUser = {
    id,
    userID,
    email,
    password: "",
    platform: "facebook",
    name,
    phone: "",
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
  const [tokenKey, refreshTokenKey] = generateToken(payload)
  newUser.refreshToken = refreshTokenKey;
  data.users.push(newUser);
  data.users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(data));
  const payload = {
    email,
    id,
  };
  return res.status(200).json({ accessToken: tokenKey, refreshToken : refreshTokenKey });
}

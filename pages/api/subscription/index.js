import fs from "fs";
import path from "path";
import connectMongoDB from "../../../utils/connectMongoDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const { email } = req.body;
  // const filePath = path.join(process.cwd(), "data", "subscriber.json");
  // const fileData = fs.readFileSync(filePath);
  // const data = JSON.parse(fileData);
  // for (let i = 0; i < data.subscriber.length; i++) {
  //   if (data.subscriber[i].email === email)
  //     return res.status(401).json({ message: "Email already used" });
  // }
  // data.subscriber.push({ email });
  // fs.writeFileSync(filePath, JSON.stringify(data));
  try {
    const client = await connectMongoDB("subscription");
    const existingEmail = await client
      .db()
      .collection("subscription emails")
      .findOne({ email });

    if (existingEmail)
      return res.status(401).json({ message: "Email already used" });
    await client.db().collection("subscription emails").insertOne({ email });
    res.status(200).json({ message: "Subcription done" });
    client.close()
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "server error" });
  }
}

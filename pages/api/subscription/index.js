import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") return;
  const { email } = req.body;
  const filePath = path.join(process.cwd(), "data", "subscriber.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  for (let i = 0; i < data.subscriber.length; i++) {
    if (data.subscriber[i].email === email)
      return res.status(401).json({ message: "Email already used" });
  }
  data.subscriber.push({ email });
  fs.writeFileSync(filePath, JSON.stringify(data));
  res.status(200).json({ message: "Subcription done" });
}

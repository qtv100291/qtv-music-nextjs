// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "GET") return;
  const { blogId } = req.query;
  const filePath = path.join(process.cwd(), "data", "article.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const articleSelected = data.articles.filter((article) => article.id.toString() === blogId);
  if (articleSelected.length > 0) {
    res.status(200).json(articleSelected[0]);
  } else {
    res.status(200).json({message : "article not found"});
  }
}
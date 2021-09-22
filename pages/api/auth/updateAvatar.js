import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import bucketUserAvatar from '../../../services/firebaseStorage'
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

function formApplication(req) {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, file) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(file);
    });
  });
}

async function uploadFile(file,id, res) {

  const blob = bucketUserAvatar.file(`${id}-avatar`)
  const blobStream = blob.createWriteStream({})
  blobStream.on("error", (err) => {
    res.status(500).send({ message: err.message });
  });
  blobStream.on("finish", async (data) => {
    // Create URL for directly file access via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucketUserAvatar.name}/${id}-avatar`
    );

    try {
      // Make the file public
      await bucket.file(`${id}-avatar`).makePublic();
    } catch {
      return res.status(500).send({
        message:
          `Uploaded the file successfully, but public access is denied!`,
        url: publicUrl,
      });
    }

    res.status(200).send({
      message: "Uploaded the file successfully" ,
      url: publicUrl,
    });
  });
  blobStream.end(file.buffer);
}


export default async function handler(req, res) {
  if (req.method !== "PATCH") return;
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  const [schema, token] = req.headers.authorization.split(" ");
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  try {
    const decode = jwt.verify(token, secretKey);
    const { id } = decode.data;
    for (let i = 0; i < data.users.length; i++) {
      if (data.users[i].id === id) {
        const file = await formApplication(req);
        console.log("file", file.imageUpload.path);
        if (file.imageUpload.size > 1024*1024)
          return res.status(413).json({ message: "file too large" });
        else {
          console.log("hiuhiu");
          
          uploadFile(file, data.users[i].id, res)
          // data.users[i].avatar = urlAvatar;
          // fs.writeFileSync(filePath, JSON.stringify(data));
          // return res.status(200).json({ message: "Avatar Updated", urlAvatar });
        }
      }
    }
    // return res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: err.message });
  }
}

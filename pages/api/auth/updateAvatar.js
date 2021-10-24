import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import Busboy from "busboy";
// import upload from "../../../services/amazonservice";
import connectMongoDB from "../../../utils/connectMongoDB";
import cloudinary from "cloudinary"

export const config = {
  api: {
    bodyParser: false,
  },
};

const cloudinaryReal  = cloudinary.v2

cloudinaryReal.config({ 
  cloud_name: process.env.NEXT_CLOUD_NAME, 
  api_key: process.env.NEXT_API_KEY, 
  api_secret: process.env.NEXT_API_SECRET
});

// export default async function handler(req, res) {
//   if (req.method !== "PATCH") return;
//   let extensionName;
//   const [schema, token] = req.headers.authorization.split(" ");
//   const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
//   try {
//     const decode = jwt.verify(token, secretKey);
//     const { email } = decode.data;
//     const client = await connectMongoDB("usersData");
//     const userCollection = await client.db().collection("users");
//     // console.log(bucketUserAvatar)
//     const busboy = new Busboy({
//       headers: req.headers,
//       limits: {
//         // Cloud functions impose this restriction anyway
//         fileSize: 1024 * 1024,
//       },
//     });
//     busboy.on(
//       "file",
//       async function (fieldname, file, filename, encoding, mimetype) {
//         // console.log("file on");
//         // console.log(mimetype)
//         if (!mimetype.includes("image")){
//           return res.status(406).json({ message: "not image file" });
//         }
//         extensionName = path.extname(filename);
//         const avatarId = uuidv4();
//         const blob = bucketUserAvatar.file(
//           `${avatarId}-avatar${extensionName}`
//         );
//         const blobStream = blob.createWriteStream();
//         blobStream.on("error", async (err) => {
//           console.log("destroyed")
//           // await blob.delete()
//           // return res.status(500).send({ message: err.message });
//         });
//         blobStream.on("finish", async (data) => {
//           console.log("upload end");
//           // if (
//           //   dataUser.users[i].avatar &&
//           //   dataUser.users[i].avatar.includes("storage.googleapis.com")
//           // ) {
//           //   const userAvatarUrlArray = dataUser.users[i].avatar.split("/");
//           //   const fileNameGCS =
//           //     userAvatarUrlArray[userAvatarUrlArray.length - 1];
//           //   await bucketUserAvatar.file(fileNameGCS).delete();
//           // }
//           await blob.makePublic();
//           const publicUrl = blob.publicUrl();
//           await userCollection.updateOne({email}, { $set: { avatar: publicUrl} })
//           return res.status(200).json({
//             message: "Uploaded the file successfully",
//             urlAvatar: publicUrl,
//           });
//         });
//         file.on("limit", function () {
//           file.destroy()
//           // blobStream.destroy()
//           return res.status(413).json({ message: "file too large" });
//         });
//         file.pipe(blobStream);
//       }
//     );
//     req.pipe(busboy);
//   } catch (err) {
//     if (err.name === "MongoServerError") return res.status(500).json({message :"server error"})
//     return res.status(401).json({ message: err.message });
//   }
// }

export default async function handler(req, res) {
  if (req.method !== "PATCH") return;
  const [schema, token] = req.headers.authorization.split(" ");
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  try {
    const decode = jwt.verify(token, secretKey);
    const { email } = decode.data;
    const client = await connectMongoDB("usersData");
    const userCollection = await client.db().collection("users");
    
    const createUploader = cloudinaryReal.uploader.upload_stream(async (err,image) =>{
      if (err) return res.status(500).json({message: "server error"})
      await userCollection.updateOne(
        { email },
        { $set: { avatar: image.url } }
      );
      client.close()
      return res.status(200).json({
            message: "Uploaded the file successfully",
            urlAvatar: image.url,
          });
    })
    const busboy = new Busboy({
      headers: req.headers,
      limits: {
        // Cloud functions impose this restriction anyway
        fileSize: 1024 * 1024,
      },
    });
    busboy.on(
      "file",
      async function (fieldname, file, filename, encoding, mimetype) {
        if (!mimetype.includes("image")) {
          return res.status(406).json({ message: "not image file" });
        }
        file.on("limit", function () {
          file.destroy();
          return res.status(413).json({ message: "file too large" });
        });
        file.pipe(createUploader)
      }
    );
    req.pipe(busboy);
  } catch (err) {
    if (err.name === "MongoServerError")
      return res.status(500).json({ message: "server error" });
    return res.status(401).json({ message: err.message });
  }
}

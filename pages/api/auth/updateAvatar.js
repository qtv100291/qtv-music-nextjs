import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import bucketUserAvatar from "../../../services/firebaseStorage";
import { v4 as uuidv4 } from "uuid";
import Busboy from "busboy";

import upload from "../../../services/amazonservice";
import connectMongoDB from "../../../utils/connectMongoDB";

export const config = {
  api: {
    bodyParser: false,
  },
};
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
  let extensionName;
  const [schema, token] = req.headers.authorization.split(" ");
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  try {
    const decode = jwt.verify(token, secretKey);
    const { email } = decode.data;

    const uploadSingleFile = upload.single("upload_file");
    uploadSingleFile(req, res, function (err) {
      console.log("start") 
      if (err) {
        console.log("hehe", err)
        return res.json({
          success: false,
          errors: {
            title: "Image Upload Error",
            detail: err.message,
            error: err,
          },
        });
      }
      let update = { profilePicture: req.file.location };
      console.log(update) 
    });
    // console.log(req.headers);
    // const busboy = new Busboy({
    //   headers: req.headers,
    //   limits: {
    //     // Cloud functions impose this restriction anyway
    //     fileSize: 1024 * 1024,
    //   },
    // });
    // busboy.on(
    //   "file",
    //   async function (fieldname, file, filename, encoding, mimetype) {
    //     if (!mimetype.includes("image")) {
    //       return res.status(406).json({ message: "not image file" });
    //     }
    //     extensionName = path.extname(filename);
    //     const avatarId = uuidv4();
    //     // const blob = bucketUserAvatar.file(
    //     //   `${avatarId}-avatar${extensionName}`
    //     // );
    //     // const testFile = path.join(process.cwd(), "data", "test.jpg")
    //     // console.log(testFile)
    //     // const testFileStream = fs.createReadStream(testFile)
    //     const uploadParams = {
    //       Bucket: "user-avatar-qtv-music-shop",
    //       // Add the required 'Key' parameter using the 'path' module.
    //       Key: `${avatarId}-avatar${extensionName}`,
    //       // Add the required 'Body' parameter
    //       Body: file,
    //     };
    //     const data = await uploadToAWS(uploadParams);
    //     // console.log("data", data)
    //     // blobStream.on("finish", async (data) => {
    //     //   console.log("upload end");
    //     //   if (
    //     //     dataUser.users[i].avatar &&
    //     //     dataUser.users[i].avatar.includes("storage.googleapis.com")
    //     //   ) {
    //     //     const userAvatarUrlArray = dataUser.users[i].avatar.split("/");
    //     //     const fileNameGCS =
    //     //       userAvatarUrlArray[userAvatarUrlArray.length - 1];
    //     //     await bucketUserAvatar.file(fileNameGCS).delete();
    //     //   }
    //     //   await blob.makePublic();
    //     //   const publicUrl = blob.publicUrl();
    //     //   dataUser.users[i].avatar = publicUrl;
    //     //   fs.writeFileSync(filePath, JSON.stringify(dataUser));
    //     //   return res.status(200).json({
    //     //     message: "Uploaded the file successfully",
    //     //     urlAvatar: publicUrl,
    //     //   });
    //     // });
    //     // file.on("end", async function () {
    //     //   const uploadParams = {
    //     //     Bucket: "user-avatar-qtv-music-shop",
    //     //     // Add the required 'Key' parameter using the 'path' module.
    //     //     Key: `${avatarId}-avatar${extensionName}`,
    //     //     // Add the required 'Body' parameter
    //     //     Body: file,
    //     //   };
    //     //   const data = await uploadToAWS(uploadParams);
    //     //   console.log("data", data);
    //     // });
    //     file.on("limit", function () {
    //       file.destroy();
    //       return res.status(413).json({ message: "file too large" });
    //     });
    //   }
    // );
    // req.pipe(busboy);
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: err.message });
  }
}

// const uploadToAWS = async (uploadParams) => {
//   try {
//     const data = await s3Client.send(new PutObjectCommand(uploadParams));
//     return data;
//   } catch (err) {
//     console.log("Error", err);
//   }
// };

import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import bucketUserAvatar from "../../../services/firebaseStorage";
import { v4 as uuidv4 } from "uuid";
import Busboy from "busboy";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../../services/amazonservice";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  if (req.method !== "PATCH") return;
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const dataUser = JSON.parse(fileData);
  let extensionName;
  const [schema, token] = req.headers.authorization.split(" ");
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  try {
    const decode = jwt.verify(token, secretKey);
    const { id } = decode.data;
    for (let i = 0; i < dataUser.users.length; i++) {
      if (dataUser.users[i].id === id) {
        // console.log(bucketUserAvatar)
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
            console.log("file on");
            console.log(mimetype)
            if (!mimetype.includes("image")){
              return res.status(406).json({ message: "not image file" });
            }
            extensionName = path.extname(filename);
            const avatarId = uuidv4();
            const blob = bucketUserAvatar.file(
              `${avatarId}-avatar${extensionName}`
            );
            const blobStream = blob.createWriteStream();
            blobStream.on("error", async (err) => {
              console.log("destroyed")
              // await blob.delete()
              // return res.status(500).send({ message: err.message });
            });
            blobStream.on("finish", async (data) => {
              console.log("upload end");
              if (
                dataUser.users[i].avatar &&
                dataUser.users[i].avatar.includes("storage.googleapis.com")
              ) {
                const userAvatarUrlArray = dataUser.users[i].avatar.split("/");
                const fileNameGCS =
                  userAvatarUrlArray[userAvatarUrlArray.length - 1];
                await bucketUserAvatar.file(fileNameGCS).delete();
              }
              await blob.makePublic();
              const publicUrl = blob.publicUrl();
              dataUser.users[i].avatar = publicUrl;
              fs.writeFileSync(filePath, JSON.stringify(dataUser));
              return res.status(200).json({
                message: "Uploaded the file successfully",
                urlAvatar: publicUrl,
              });
            });
            file.on("limit", function () {
              file.destroy()
              blobStream.destroy()
              return res.status(413).json({ message: "file too large" });
            });
            file.pipe(blobStream);
          }
        );
        req.pipe(busboy);
      }
    }
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: err.message });
  }
}



// export default async function handler(req, res) {
//   if (req.method !== "PATCH") return;
//   const filePath = path.join(process.cwd(), "data", "users.json");
//   const fileData = fs.readFileSync(filePath);
//   const dataUser = JSON.parse(fileData);
//   let extensionName;
//   const [schema, token] = req.headers.authorization.split(" ");
//   const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
//   try {
//     const decode = jwt.verify(token, secretKey);
//     const { id } = decode.data;
//     for (let i = 0; i < dataUser.users.length; i++) {
//       if (dataUser.users[i].id === id) {
//         // console.log(bucketUserAvatar)
//         const busboy = new Busboy({
//           headers: req.headers,
//           limits: {
//             // Cloud functions impose this restriction anyway
//             fileSize: 1024 * 1024,
//           },
//         });
//         busboy.on(
//           "file",
//           async function (fieldname, file, filename, encoding, mimetype) {
//             console.log("file on");
//             if (!mimetype.includes("image")){
//               return res.status(406).json({ message: "not image file" });
//             }
//             extensionName = path.extname(filename);
//             const avatarId = uuidv4();
//             const blob = bucketUserAvatar.file(
//               `${avatarId}-avatar${extensionName}`
//             );
//             const testFile = path.join(process.cwd(), "data", "test.jpg")
//             console.log(testFile)
//             const testFileStream = fs.createReadStream(testFile)
//             const uploadParams = {
//               Bucket: "user-avatar-qtv-music-shop",
//               // Add the required 'Key' parameter using the 'path' module.
//               Key: `${avatarId}-avatar${extensionName}`,
//               // Add the required 'Body' parameter
//               Body: testFileStream,
//             };
//             const data = await run(uploadParams)
//             console.log("data", data)
//             // blobStream.on("finish", async (data) => {
//             //   console.log("upload end");
//             //   if (
//             //     dataUser.users[i].avatar &&
//             //     dataUser.users[i].avatar.includes("storage.googleapis.com")
//             //   ) {
//             //     const userAvatarUrlArray = dataUser.users[i].avatar.split("/");
//             //     const fileNameGCS =
//             //       userAvatarUrlArray[userAvatarUrlArray.length - 1];
//             //     await bucketUserAvatar.file(fileNameGCS).delete();
//             //   }
//             //   await blob.makePublic();
//             //   const publicUrl = blob.publicUrl();
//             //   dataUser.users[i].avatar = publicUrl;
//             //   fs.writeFileSync(filePath, JSON.stringify(dataUser));
//             //   return res.status(200).json({
//             //     message: "Uploaded the file successfully",
//             //     urlAvatar: publicUrl,
//             //   });
//             // });
//             file.on("limit", function () {
//               file.destroy()
              
//               return res.status(413).json({ message: "file too large" });
//             });
//           }
//         );
//         req.pipe(busboy);
//       }
//     }
//   } catch (err) {
//     console.log(err.message);
//     return res.status(401).json({ message: err.message });
//   }
// }

// const run = async (uploadParams) => {
//   try {
//     const data = await s3Client.send(new PutObjectCommand(uploadParams));
//     return data
//   } catch (err) {
//     console.log("Error", err);
//   }
// };
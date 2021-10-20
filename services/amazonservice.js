import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = "ap-southeast-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });
export { s3Client };
// import aws from "aws-sdk";
// import multer from "multer";
// import multerS3 from "multer-s3";
// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID ,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: "ap-southeast-1",
// });
// const s3 = new aws.S3();
// console.log(process.env.AWS_ACCESS_KEY_ID)

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.includes("image")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
//   }
// };


// const upload = multer({
//   fileFilter,
//   storage: multerS3({
//     acl: "public-read",
//     s3: s3,
//     bucket: "user-avatar-qtv-music-shop",
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString());
//     },
//   }),
// });

// export default upload;

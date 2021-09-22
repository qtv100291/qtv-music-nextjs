// import firebase from "firebase";

var admin = require("firebase-admin");

const serviceAccount = require("./qtv-music-shop-firebase-adminsdk-edwcz-217f2f365b.json");

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://qtv-music-shop.firebaseio.com",
  });
}
const bucketUserAvatar = admin.storage().bucket("user-avatar");

export default bucketUserAvatar;
// const firebaseConfig = {
//   apiKey: "AIzaSyAdvK5_3Dzwj9TCLK0bchXRczpXAI7VjlU",
//   authDomain: "qtv-music-shop.firebaseapp.com",
//   databaseURL: "https://qtv-music-shop.firebaseio.com",
//   projectId: "qtv-music-shop",
//   storageBucket: "qtv-music-shop.appspot.com",
//   messagingSenderId: "486744017757",
//   measurementId: "G-9LVF68HCQ8",
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// const storage = firebase.storage();
// const storageRef = storage.ref();
// export default storageRef;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAcA2v-oWVur4zwxPTqAYo9jOjK794wT80",
//   authDomain: "social-923fd.firebaseapp.com",
//   projectId: "social-923fd",
//   storageBucket: "social-923fd.appspot.com",
//   messagingSenderId: "172046135121",
//   appId: "1:172046135121:web:db79bf0cf9023d04d4ad70"
// };



const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
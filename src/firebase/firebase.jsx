// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const auth = firebase.auth()
const firestore = firebase.firestore()



const firebaseConfig = {
  apiKey: "AIzaSyCDPebzy5acXfAfVSAMPUSgadOjONQtXPc",
  authDomain: "realtime-gm.firebaseapp.com",
  databaseURL: "https://realtime-gm-default-rtdb.firebaseio.com",
  projectId: "realtime-gm",
  storageBucket: "realtime-gm.appspot.com",
  messagingSenderId: "154276607368",
  appId: "1:154276607368:web:7b31fe5a1f661f9332b63d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
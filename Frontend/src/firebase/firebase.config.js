// src/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5qEd9o2j2U1z9JFu-x5UTf4eq4EAnCC4",
  authDomain: "dairy-product-755e8.firebaseapp.com",
  projectId: "dairy-product-755e8",
  storageBucket: "dairy-product-755e8.appspot.com",
  messagingSenderId: "1040990958129",
  appId: "1:1040990958129:web:5ed4cd4e5035fb30705b10"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


import { initializeApp } from "firebase/app" ;   
import { getAnalytics } from "firebase/analytics" ;   
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { 
  apiKey : "AIzaSyC1Ew-_MwtpBETDhEtL9q1MzZnAYTqfTFc" , 
  authDomain : "trip-web-70423.firebaseapp.com" , 
  projectId : "trip-web-70423" , 
  storageBucket : "trip-web-70423.appspot.com" , 
  messagingSenderId : "323444445695" , 
  appId : "1:323444445695:web:6bd8a72e998088006217ca" , 
  measurementId : "G-993X7ELM8Z" 
};

// Initialize Firebase
const app = initializeApp ( firebaseConfig );
const analytics = getAnalytics ( app );
export const db = getFirestore(app);

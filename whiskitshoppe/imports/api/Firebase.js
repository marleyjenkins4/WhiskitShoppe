// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEywtAAwj82AJvyhdBRlOR4H6tGEYnb3s",
    authDomain: "the-whisk-it-shoppe.firebaseapp.com",
    projectId: "the-whisk-it-shoppe",
    storageBucket: "the-whisk-it-shoppe.appspot.com",
    messagingSenderId: "511160632461",
    appId: "1:511160632461:web:13dee77d5a517e1d528ec4",
    measurementId: "G-59FPGFC1MP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;


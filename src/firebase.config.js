// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCNLsdgF1f8pDWQNIaSGKPxAd6-VwI0kFk",
	authDomain: "real-estate-app-54d83.firebaseapp.com",
	projectId: "real-estate-app-54d83",
	storageBucket: "real-estate-app-54d83.appspot.com",
	messagingSenderId: "760992538669",
	appId: "1:760992538669:web:0db6ebd922bfd1bb6d98a4",
};

// Initialize Firebase
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db, doc };

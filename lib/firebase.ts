import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import 'firebase/auth';


import  firebase  from "firebase/app";





const firebaseConfig = {
  apiKey: "AIzaSyCntFeaKnmYWV9FRqVN5ONNLO-XFA97F8U",
  authDomain: "college-project-d340c.firebaseapp.com",
  projectId: "college-project-d340c",
  storageBucket: "college-project-d340c.firebasestorage.app",
  messagingSenderId: "598921752312",
  appId: "1:598921752312:web:b3c21cca025e10f165950d",
  measurementId: "G-08LRDBE7KR"
};
  

export const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
export const db = getFirestore()
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export const getCurrentUser = ()=>{
  return auth.currentUser

}


export { firebase}
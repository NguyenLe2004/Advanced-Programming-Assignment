const { initializeApp } = require( "firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyAVbd99_-A2e1CZzrWDhyAHUqDPghEvHjI",
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: "https://hospital-management-67fd7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hospital-management-67fd7", // process.env.PROJECT_ID
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: "542108883", // 
  appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = database;
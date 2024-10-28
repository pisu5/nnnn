// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyDNRD76iKsw30_SjmV5bVwlH6Gb03sfNTw",
  authDomain: "clientworks-1fe99.firebaseapp.com",
  databaseURL: "https://clientworks-1fe99-default-rtdb.firebaseio.com",
  projectId: "clientworks-1fe99",
  storageBucket: "clientworks-1fe99.appspot.com",
  messagingSenderId: "1070590846003",
  appId: "1:1070590846003:web:af839c3e58e6c4eae1af46",
  measurementId: "G-NCWGBM501Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

document
  .getElementById("newsletterForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("emailInput").value;
    const responseMessage = document.getElementById("response");

    if (email) {
      const newSubscriptionRef = ref(database, "subscriptions");
      const newSub = push(newSubscriptionRef);

      set(newSub, {
        email: email,
        subscribedAt: new Date().toISOString(),
      })
        .then(() => {
          responseMessage.innerText =
            "Subscription successful! Thank you for subscribing.";
          responseMessage.style.color = "green";
          document.getElementById("emailInput").value = "";
        })
        .catch((error) => {
          console.error("Error saving subscription:", error);
          responseMessage.innerText =
            "Failed to subscribe. Please try again later.";
          responseMessage.style.color = "red";
        });
    } else {
      responseMessage.innerText = "Please enter a valid email.";
      responseMessage.style.color = "red";
    }
  });

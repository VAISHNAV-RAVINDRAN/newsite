import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
const firebaseConfig = {
apiKey: "AIzaSyBbYSMHSkL2C-W5E2Sxc5LJeAdZp7l5oyY",
authDomain: "vimoweb-website.firebaseapp.com",
databaseURL: "https://vimoweb-website-default-rtdb.firebaseio.com",
projectId: "vimoweb-website",
storageBucket: "vimoweb-website.appspot.com",
messagingSenderId: "832178264035",
appId: "1:832178264035:web:f44a01fab8c5b5926c72d6",
measurementId: "G-VMB9YQESHS"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
  document.getElementById("login").addEventListener("click", function (e){
      e.preventDefault();
      set(ref(db, '/user' + document.getElementById("uname").value),
{ 
          username:document.getElementById("uname").value,              password:document.getElementById("pass").value
});
alert("Login successfully ")
})

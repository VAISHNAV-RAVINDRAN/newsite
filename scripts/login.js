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

const loginbtn = document.getElementById("loginbtn");
const username = document.getElementById("username");
const password = document.getElementById("password");
loginbtn.addEventListener("click", function (event){
event.preventDefault();
const userRef = ref(db, 'users/' + username.value);
get(userRef).then((snapshot) => { 
if (snapshot.exists()) { 
const data = snapshot.val(); 
var p = JSON.stringify(data['password']).replace(/['"]+/g, '');
if(p == password.value) {
    console.log("Login Successfully");
    window.open("home.html");
    username.value = "";
    password.value = "";
}
else{
    console.log("Login Failed");
    alert("Invalid Credentials")
    username.value = "";
    password.value = "";
}
} 
})
.catch((error) => { 
console.error(error); 
});
});
  
window.addEventListener('popstate',
history.pushState(null, null, document.URL));
window.addEventListener('popstate', function (){ 
history.pushState(null, null, document.URL); 
});


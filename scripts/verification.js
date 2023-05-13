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

const currentUser = localStorage.getItem('currentUser');
const otpField = document.getElementById("otp");
const verifybtn = document.getElementById("verify");
const errortxt = document.getElementById("error-msg");

verifybtn.addEventListener("click", function (event){
event.preventDefault();
if(currentUser == "" || currentUser == null) {
   alert("Sorry Unable To Reset The Password");
}
else {
const userRef = ref(db, 'users/' + 
    currentUser + '/verification');
get(userRef).then((snapshot) => { 
if (snapshot.exists()) { 
const data = snapshot.val(); 
var c = JSON.stringify(data['verifycode']).replace(/['"]+/g, '');
if (otpField.value == c) {
    errortxt.innerHTML = "OTP verification Successfully";
    errortxt.style.color = "green";
    otpField.value = "";
    window.open("UpdatePassword.html");
}
else{
    errortxt.innerHTML = `Invalid OTP&nbsp;<b onClick="window.location.href='ForgetPassword.html'">Resend</b>`;
    errortxt.style.color = "red";
    otpField.value = "";
}
}
else{
    errortxt.innerHTML = "User Not Found";
    errortxt.style.color = "red";
    otpField.value = "";
}
});
}
});

window.addEventListener('popstate',
history.pushState(null, null, document.URL));
window.addEventListener('popstate', function (){ 
history.pushState(null, null, document.URL); 
});

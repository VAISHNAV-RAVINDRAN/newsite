window.history.pushState(null, null, location.href);
window.onpopstate = function(event) {
    window.history.pushState(null, null, location.href);
};


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

var usernameField = document.getElementById("username");
const sendbtn = document.getElementById("send");

sendbtn.addEventListener("click", function (event){
event.preventDefault();
if(usernameField.value == "") {
alert("Please Enter The Username");
}
else{
const userRef = ref(db, 'users/' + usernameField.value);
get(userRef).then((snapshot) => { 
if (snapshot.exists()) { 
const data = snapshot.val(); 
var eid = JSON.stringify(data['email']).replace(/['"]+/g, '');
var OTP = generateOTP();
Email.send({ 
SecureToken : "680073e2-f904-4c42-a752-8f92711f5bb4", 
To : eid, 
From : "vimowebcd@outlook.com", 
Subject : "VERIFICATION MAIL", 
Body : "<!DOCTYPE html><html><head><title>VIMOWEB | Verification Code</title></head><body style='background-color: #f2f2f2; font-family: Arial, sans-serif;'><table style='max-width: 600px; padding: 20px; margin: auto; border-collapse: collapse;'><tr><td style='background-color: #4CAF50; text-align: center; padding: 10px;'><h1 style='color: white;'>VIMOWEB</h1></td></tr><tr><td style='background-color: white; padding: 20px;'><h2 style='color: #4CAF50; margin-bottom: 20px;'>Verification Code</h2><p style='font-size: 18px; line-height: 1.5;'>Your Verification Code Is : <span style='font-weight: bold;'>"+OTP+"</span></p></td></tr><tr><td style='background-color: #333333; color: #fff; text-align: center; padding: 10px;'><p style='font-size: 14px;'>&copy; 2023 VIMOWEB. All rights reserved.</p></td></tr></table></body></html>" 
}).then((message) => {
if(message == "OK") {
const hidePart = eid.slice(2, -4).length;
const maskedEid = eid.slice(0, 2) + "*".repeat(hidePart) + eid.slice(-4);
alert("Verification Code Is Send to the "+maskedEid+" Successfully");
set(ref(db,'/users/' + 
    usernameField.value + '/verification'),{
verifyemail:eid,
verifycode:OTP
});
localStorage.setItem('currentUser', usernameField.value);
usernameField.value = "";
window.open("verification.html");
}
else{
    alert("Cannot Send The Verification Code");
    usernameField.value = "";
}
});    
}
else{
    alert("User Not Found");
}
});
}
});


function generateOTP() {
const charset = '0123456789';
let otp = '';
for (let i = 0; i < 6; i++) {
const randomIndex = Math.floor(Math.random() * charset.length);
const randomChar = charset[randomIndex];
otp += randomChar;
}
return otp;
}


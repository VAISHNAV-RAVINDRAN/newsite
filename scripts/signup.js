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

const passwordField = document.getElementById("password");
const passwordConfirmField = document.getElementById("confirm-password");
const togglePassword = document.getElementById("toggle-password");
const form = document.getElementById("form");

togglePassword.addEventListener("change", function() { 
const passwordType = togglePassword.checked ? "text" : "password"; 
passwordField.setAttribute("type", passwordType); passwordConfirmField.setAttribute("type", passwordType); 
});

const usernameField = document.getElementById("username");
const emailField = document.getElementById("email");
const signupbtn = document.getElementById("signup");

form.addEventListener("submit", function(event) {
let valid = true;
const usernameError = document.querySelector("#username + .error");
const emailError = document.querySelector("#email + .error");
if (!isValidEmail(emailField.value)) {
emailError.textContent = "Invalid email address";
emailError.style.display = "block";
valid = false;
} 
else{
emailError.style.display = "none";
}
const passwordError = document.querySelector("#password + .error");
if (!isValidPassword(passwordField.value)) {
passwordError.style.display = "block";
valid = false;
} 
else{
passwordError.style.display = "none";
}
const passwordConfirmError = document.querySelector("#confirm-password + .error");
if(passwordField.value !== passwordConfirmField.value){
passwordConfirmError.textContent = "Passwords do not match";
passwordConfirmError.style.display = "block";
valid = false;
} 
else{
passwordConfirmError.style.display = "none";
}
if(!valid){
event.preventDefault();
}
});

function isValidEmail(email) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
}
function isValidPassword(password) {
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
return passwordRegex.test(password);
}

usernameField.addEventListener('keyup', (event) => {
const currentValue = event.target.value; const regex = /^[a-zA-Z0-9_]*$/; 
if (!regex.test(currentValue)) { 
const newValue = currentValue.replace(/[^a-zA-Z0-9_]/g, ''); 
event.target.value = newValue; 
}

const username = usernameField.value;
if(username.trim() !== '') {
const usernameRef = ref(db, 'users/' + username);
get(usernameRef)
.then((snapshot) => {
if (snapshot.exists()) {
const uerror = document.querySelector(".error");
uerror.style.display = "block";
uerror.style.color = "red";
uerror.innerHTML = "Username is not  available";
} 
else {
const uerror = document.querySelector(".error");
uerror.style.display = "block";
uerror.style.color = "#4CAF50";
uerror.innerHTML = "Username is available";
}
})
.catch((error) => {
console.error('Error checking username:', error);
});
}
});

signupbtn.addEventListener("click", function (event){
event.preventDefault();
const usernameRef = ref(db, 'users/' + usernameField.value);
get(usernameRef)
.then((snapshot) => {
if (snapshot.exists()) {
alert("Username already exists!");
usernameField.value = "";
emailField.value = "";
passwordField.value = "";
passwordConfirmField.value = "";
} 
else{
set(ref(db,'/users/' + usernameField.value),{
username:usernameField.value,
email:emailField.value,
password:passwordField.value
});
usernameField.value = "";
emailField.value = "";
passwordField.value = "";
passwordConfirmField.value = "";
alert("Login successfully");
}
});
});
  
window.addEventListener('popstate',
history.pushState(null, null, document.URL));
window.addEventListener('popstate', function (){ 
history.pushState(null, null, document.URL); 
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
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

const passwordField = document.getElementById("password");
const passwordConfirmField = document.getElementById("cpassword");
const updatebtn = document.getElementById("update");

updatebtn.addEventListener("click", function (event){
event.preventDefault();
if(passwordField.value == "" && passwordConfirmField.value == ""){
    alert("Please Fill The Fields");
}
else if(passwordField.value != passwordConfirmField.value){
    alert("Password Doesn't Match");
}
else{
update(ref(db,'/users/' + currentUser),{
password:passwordField.value
});
remove(ref((db),'/users/'+currentUser+'/verification'));
passwordField.value = "";
passwordConfirmField.value = "";
alert("Password Updated Successfully");
window.open("login.html");
}
});


window.addEventListener('popstate',
history.pushState(null, null, document.URL));
window.addEventListener('popstate', function (){ 
history.pushState(null, null, document.URL); 
});

//IMPORT
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///Define 
const input_login_email = document.getElementById("input_login_email");
const input_login_pwd = document.getElementById("input_login_pwd");
const register_button = document.getElementById("register_button");
const login_button = document.getElementById("login_button");
const input_register_email = document.getElementById("input_register_email");
const input_register_pwd = document.getElementById("input_register_pwd");
const input_register_number = document.getElementById("input_register_number");
const pwd_check = document.getElementById("progress_current_value");
const flags_list = document.getElementById("flags_list");

//Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCka1Tb7vtqNqfyieiB7wyE9gEp7wC3NDg",
    authDomain: "astronomyx-space.firebaseapp.com",
    projectId: "astronomyx-space",
    storageBucket: "astronomyx-space.appspot.com",
    messagingSenderId: "817695494145",
    appId: "1:817695494145:web:a6a21426574e005392b000"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))(?=.*[0-9]))(?=.{6,})|(((?=.*[a-z])(?=.*[A-Z]))(?=.*[!@#\$%\^&\*]))(?=.{6,})|(((?=.*[a-z])(?=.*[0-9]))(?=.*[!@#\$%\^&\*]))(?=.{6,})|(((?=.*[A-Z])(?=.*[0-9]))(?=.*[!@#\$%\^&\*]))(?=.{6,})");
var weakRegex = new RegExp("^((?=.*[a-z])(?=.*[A-Z])(?=.{6,}))|((?=.*[a-z])(?=.*[0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.{6,}))|((?=.*[A-Z])(?=.*[0-9])(?=.{6,}))|((?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,}))");
// let image = "";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//SET UP
function error1() {
    input_register_email.value = "Incorrect username or password.";
    input_register_pwd.value = "";
    input_register_number.value = "";
    input_register_email.style.color = "red";
    input_register_email.style.fontWeight = "500";
    input_register_email.disabled = true;
    input_register_pwd.disabled = true;
    input_register_number.disabled = true;
    setTimeout(function () {
        input_register_email.value = "";
        input_register_email.disabled = false;
        input_register_pwd.disabled = false;
        input_register_number.disabled = false;
        input_register_email.style.color = "black";
        input_register_email.style.fontWeight = "400";
    }, 3000)
}
function error2() {
    input_login_email.value = "Error syntax";
    input_login_email.style.color = "red";
    input_login_email.style.fontWeight = "500";
    input_login_pwd.value = "";
    input_login_email.disabled = true;
    input_login_pwd.disabled = true;
    setTimeout(function () {
        input_login_email.value = "";
        input_login_email.disabled = false;
        input_login_pwd.disabled = false;
        input_login_email.style.color = "black";
        input_login_email.style.fontWeight = "400";
    }, 3000);
}

//FLAG UPDATING
fetch('/assets/json/countrynumber.json')
    .then((response) => response.json())
    .then((json) => {
        let container = json;
        for (let i of container) {
            let li = document.createElement("li");
            li.classList.add("flag_containers")
            li.innerHTML = `
            <img src="${i.flag}" alt="" class="countries_flags">
            <span class="countries_name">${i.isoCode}</span>
        `;
            flags_list.appendChild(li);
        }
        let firstNation = {
            "name": "Vietnam",
            "phoneCode": "+84"
        }
        localStorage.setItem("currentNation", JSON.stringify(firstNation))
        const flag_items = document.querySelectorAll(".flag_containers");
        const main_flag = document.querySelector("#main_flag");
        for (let i = 0; i < flag_items.length; i++) {
            flag_items[i].addEventListener("click", (e) => {
                main_flag.src = `${flag_items[i].getElementsByTagName("img")[0].src}`
                flags_list.style.display = "none";
                let currentNation = {
                    "name": container[i].name,
                    "phoneCode": container[i].dialCode
                }
                localStorage.setItem("currentNation", JSON.stringify(currentNation))
            })
        }
    });
document.getElementById("flag_checkbox").addEventListener("click", (e) => {
    flags_list.style.display = "block";
})

// PASSWORD REVEALING
// LOGIN
const eye_open = document.getElementById("eye_open");
const eye_close = document.getElementById("eye_close");
eye_open.addEventListener("click", (e) => {
    eye_open.classList.remove("bi-active");
    eye_close.classList.add("bi-active");
    input_login_pwd.type = "password";
})
eye_close.addEventListener("click", (e) => {
    eye_close.classList.remove("bi-active");
    eye_open.classList.add("bi-active");
    input_login_pwd.type = "text";
})
//REGISTER
const eye_open_register = document.getElementById("eye_open_register");
const eye_close_register = document.getElementById("eye_close_register");
eye_open_register.addEventListener("click", (e) => {
    eye_open_register.classList.remove("bi-active");
    eye_close_register.classList.add("bi-active");
    input_register_pwd.type = "password";
})
eye_close_register.addEventListener("click", (e) => {
    eye_close_register.classList.remove("bi-active");
    eye_open_register.classList.add("bi-active");
    input_register_pwd.type = "text";
})



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //REGISTER
register_button.addEventListener("click", (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, input_register_email.value, input_register_pwd.value)
        .then((userCredential) => {
            // Signed up
            if (input_register_pwd.value.trim().length >= 6) {
                if (input_register_number.value.length >= 9 && input_register_number.value.length <= 15 || input_register_number.value.length == 0) {
                    const user = userCredential.user;
                    if (input_register_email.value === "admin@gmail.com")
                        location.replace("/admin/home_admin.html")
                    else location.replace("/user/home_user.html")
                }
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            error1();
        }
        )
});
//CHECK PASSWORD STRONG
input_register_pwd.addEventListener("input", (e) => {
    if (strongRegex.test(e.target.value)) {
        pwd_check.style.width = "100%";
        pwd_check.style.backgroundColor = "green";
    }
    else if (mediumRegex.test(e.target.value)) {
        pwd_check.style.width = "66%";
        pwd_check.style.backgroundColor = "yellow";
    }
    else if (weakRegex.test(e.target.value)) {
        pwd_check.style.width = "33%";
        pwd_check.style.backgroundColor = "red";
    }
    else {
        pwd_check.style.backgroundColor = "grey";
        pwd_check.style.width = "0%";
    }
})

// let email = input_register_email.value;
// let password = document.getElementById("input_register_pwd").value;
// let id_user = (Math.random() * 10 ** 9).toPrecision(9);
// let role = "";
// let phone = "";
// let total_amount = 0;
// if (email === "admin@gmail.com") {
//     role = "Admin";
//     total_amount = 2000;
// }
// else {
//     role = "User";
//     total_amount = 1000;
// }
// cart = 0;
// phone = input_register_number.value;
// const user = { email, password, role, phone, image, total_amount, cart, id_user };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //LOGIN
login_button.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth,input_login_email.value, input_login_pwd.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if (input_register_email.value === "admin@gmail.com")
                location.replace("/admin/home_admin.html")
            else location.replace("/user/home_user.html")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            error1();
        });
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// if (localStorage.getItem("user_test") !== null) {
//     localStorage.setItem("user_test", "[]");
//     localStorage.setItem("user_history", "[]");
// }

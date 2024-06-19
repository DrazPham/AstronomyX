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


let pwd_range = pwd_check.value;
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))(?=.*[0-9]))(?=.{6,})|(((?=.*[a-z])(?=.*[A-Z]))(?=.*[!@#\$%\^&\*]))(?=.{6,})|(((?=.*[a-z])(?=.*[0-9]))(?=.*[!@#\$%\^&\*]))(?=.{6,})|(((?=.*[A-Z])(?=.*[0-9]))(?=.*[!@#\$%\^&\*]))(?=.{6,})");
var weakRegex = new RegExp("^((?=.*[a-z])(?=.*[A-Z])(?=.{6,}))|((?=.*[a-z])(?=.*[0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.{6,}))|((?=.*[A-Z])(?=.*[0-9])(?=.{6,}))|((?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,}))");
let userArray = [];
let length = 0;
let image = "";
function error1(){
    document.getElementById("input_register_email").value = "Error Syntax";
    document.getElementById("input_register_pwd").value ="";
    document.getElementById("input_register_number").value = "";
    document.getElementById("input_register_email").disabled = true;
    document.getElementById("input_register_pwd").disabled = true;
    document.getElementById("input_register_number").disabled = true;
    setTimeout(function(){
        document.getElementById("input_register_email").value = "";
        document.getElementById("input_register_email").disabled = false;
        document.getElementById("input_register_pwd").disabled = false;
        document.getElementById("input_register_number").disabled = false;
    },3000)
}
function error2() {
    document.getElementById("input_login_email").value = "Wrong email or password";
    document.getElementById("input_login_pwd").value ="";
    document.getElementById("input_login_email").disabled = true;
    document.getElementById("input_login_pwd").disabled = true;
    setTimeout(function(){
        document.getElementById("input_login_email").value = "";
        document.getElementById("input_login_email").disabled = false;
        document.getElementById("input_login_pwd").disabled = false;
    }, 3000);
}


//REGISTER
input_register_pwd.addEventListener("input",(e)=>{
    // // if (regexPasswordNum.test(e.value === false && check_3 ===0)){
    //     pwd_check.value += 30;
    //     check_3 =1;
    //     console.log("hello");
    // }
    if (strongRegex.test(e.target.value)){
        // pwd_check.value = 100;
        pwd_check.style.width = "100%";
        pwd_check.style.backgroundColor = "green";
    }
    else if (mediumRegex.test(e.target.value)){
        // pwd_check.value= 66;
        pwd_check.style.width = "66%";
        pwd_check.style.backgroundColor = "yellow";
    }
    else if (weakRegex.test(e.target.value)){
        // pwd_check.value = 33;
        pwd_check.style.width = "33%";
        pwd_check.style.backgroundColor = "red";
    }
    else{
        // pwd_check.value =0;
        pwd_check.style.backgroundColor = "grey";
        pwd_check.style.width = "0%";
    }
    // if ( document.getElementById("input_register_pwd").value.trim().length > 12 && check_1 ===0) {
    //     pwd_check.value+= 30;
    //     check_1 = 1;
    // }
    // else if (document.getElementById("input_register_pwd").value.trim().length < 12 && check_1 === 1){
    //     pwd_check.value-= 30;
    //     check_1 =0;
    // }
    // if ( document.getElementById("input_register_pwd").value.trim() !==  document.getElementById("input_register_pwd").value.trim().toLowerCase() && check_2 ===0){
    //     pwd_check.value+= 30;
    //     check_2 =1;
    // }
    // else if (document.getElementById("input_register_pwd").value.trim() ===  document.getElementById("input_register_pwd").value.trim().toLowerCase() && check_2 ===1){
    //     pwd_check.value-= 30;
    //     check_2 =0;
    // }
})
fetch('/assets/json/countrynumber.json')
.then((response) => response.json())
.then((json) => {
    let container = json;
    for (let i of container){
        let li = document.createElement("li");
        li.classList.add("flag_containers")
        li.innerHTML = `
            <img src="${i.flag}" alt="" class="countries_flags">
            <span class="countries_name">${i.isoCode}</span>
        `;
        flags_list.appendChild(li);
    }
    let firstNation = {
        "name" : "Vietnam",
        "phoneCode": "+84"
    }
    localStorage.setItem("currentNation",JSON.stringify(firstNation))
const flag_items = document.querySelectorAll(".flag_containers");
const main_flag = document.querySelector("#main_flag");
for (let i = 0 ; i< flag_items.length;i++){
    flag_items[i].addEventListener("click", (e)=>{
        main_flag.src =`${flag_items[i].getElementsByTagName("img")[0].src}`
        flags_list.style.display = "none";
        let currentNation = {
            "name" : container[i].name,
            "phoneCode": container[i].dialCode
        }
        localStorage.setItem("currentNation",JSON.stringify(currentNation))
    })
}
});


register_button.addEventListener("click", (e) => {
    e.preventDefault();
    if (localStorage.getItem("register") !== null){
        let userLocal = JSON.parse(localStorage.getItem("register"));
        userArray = [...userLocal]
    }
    let email = document.getElementById("input_register_email").value;
    let password = document.getElementById("input_register_pwd").value;
    let id_user = (Math.random()*10**9).toPrecision(9);
    let role = "";
    let phone = "";
    let total_amount = 0;
    // if (email.includes("@admin")){
    //     role = "Admin";
    //     total_amount = 2000;
    // }
    // else {
    //     role = "User";
    //     total_amount = 1000;
    // }

    if (email === "admin@gmail.com"){    
        role = "Admin";
        total_amount = 2000;
    }
    else {
        role = "User";
        total_amount = 1000;
    }
    cart = 0;
    if (input_register_number.value.length>=9 &&input_register_number.value.length<=15)
        phone = input_register_number.value;

    const user = { email, password,role,phone,image,total_amount,cart,id_user};    

    //Check Validation
    if (password.trim().length < 6 || !email.includes("@")|| input_register_number.value.length<9 || input_register_number.value.length>15){
        error1();
        // console.log("2");
    }
    if (userArray.length === 0 && password.trim().length >= 6 && email.includes("@")&&  (input_register_number.value.length>=9 || input_register_number.value.length === 0 ) &&(input_register_number.value.length<=15 || input_register_number.value.length === 0 )){
        if (JSON.parse(localStorage.getItem("register")) === null ||JSON.parse(localStorage.getItem("register")).length === 0 ){
            userArray.push(user);  
            localStorage.setItem(id_user, JSON.stringify(user))
            localStorage.setItem("current_id",id_user);
            // console.log("1");
            if (user.role === "User")
                location.replace("/user/home_user.html")
            else location.replace("/admin/home_admin.html")
        }
        else{
            userArray.push(user);  
            localStorage.setItem(id_user, JSON.stringify(user));
            // console.log("2");
        }
    }
    else if (userArray.length !== 0 && password.trim().length >= 6 && email.includes("@") &&  (input_register_number.value.length>=9  || input_register_number.value.length<=15 )) {
        let check = false;
        userArray.forEach(item => {
            if (item.email === user.email || item.phone === user.phone ) {
                check = true;
                error1();
                // console.log("3");
            }
        })

        if (check === false){
            userArray.push(user);
            localStorage.setItem(id_user, JSON.stringify(user))
            localStorage.setItem("current_id",id_user);
            // console.log("4");
            if (user.role === "User")
                location.replace("/user/home_user.html")
            else location.replace("/admin/home_admin.html")

        }
        }


    let newUser = JSON.stringify(userArray)
    /// JS --> JSON 
    // console.log(newUser);
    localStorage.setItem("register", newUser)
    // if (valid == true && check === false)
    //     location.replace("./home_user.html")
}

// }
)



//LOGIN
login_button.addEventListener("click",(e) =>{
    e.preventDefault();
    let email = document.getElementById("input_login_email").value;
    let password = document.getElementById("input_login_pwd").value;

    let userArr = JSON.parse(localStorage.getItem("register"));
    if (userArr === null) error2();
    if (!userArr.some(item => item.email === email && item.password === password)) {
        error2(); 
    } else {
        if (user.role === "user")
            location.replace("/user/home_user.html")
        else location.replace("/admin/home_admin.html")
    }
    
})

document.getElementById("flag_checkbox").addEventListener("click", (e)=>{
    flags_list.style.display = "block";
})

if (localStorage.getItem("user_test") !== null){
    localStorage.setItem("user_test","[]");
    localStorage.setItem("user_history","[]");
}




// PASSWORD REVEALING
// LOGIN
const eye_open = document.getElementById("eye_open");
const eye_close = document.getElementById("eye_close");
eye_open.addEventListener("click", (e)=>{
    eye_open.classList.remove("bi-active");
    eye_close.classList.add("bi-active");
    input_login_pwd.type = "password";
})
eye_close.addEventListener("click", (e)=>{
    eye_close.classList.remove("bi-active");
    eye_open.classList.add("bi-active");
    input_login_pwd.type = "text";
})
//REGISTER
const eye_open_register = document.getElementById("eye_open_register");
const eye_close_register = document.getElementById("eye_close_register");
eye_open_register.addEventListener("click", (e)=>{
    eye_open_register.classList.remove("bi-active");
    eye_close_register.classList.add("bi-active");
    input_register_pwd.type = "password";
})
eye_close_register.addEventListener("click", (e)=>{
    eye_close_register.classList.remove("bi-active");
    eye_open_register.classList.add("bi-active");
    input_register_pwd.type = "text";
})

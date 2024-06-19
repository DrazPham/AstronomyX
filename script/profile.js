let user_name =document.getElementById("user_info_name");
let user_mail =document.getElementById("user_info_mail");
let user_pwd =document.getElementById("user_info_pwd");
let user_role =document.getElementById("user_info_role");
let user_number = document.getElementById("user_info_number");
let user_nation = document.getElementById("user_info_nation");
let user_wallet = document.getElementById("user_info_wallet");
let user_product = document.getElementById("user_info_product");
let user_id_container = document.getElementById("user_info_id");

let greeting = document.getElementById("greeting");
let change_but = document.getElementById("image_button");
let ava = document.getElementById("img_ava");
let user_id = localStorage.getItem("current_id");


let user_info = JSON.parse(localStorage.getItem(user_id));
if (user_info.phone!==""){
    let nation = JSON.parse(localStorage.getItem("currentNation"));
    user_number.innerHTML = `<b>Number:</b> (${nation.phoneCode}) ${user_info.phone.slice(1,user_info.phone.length)}`;
    user_nation.innerHTML = `<b>Nation:</b> ${nation.name}`
}
let user_name_string = user_info.email.split("@")[0]
user_name.innerHTML = `<b>Username:</b> ${user_name_string}`;
user_mail.innerHTML = `<b>Mail:</b> ${user_info.email}`;
user_pwd.innerHTML = `<b>Password:</b> ${user_info.password}`;
user_role.innerHTML = `<b>Role:</b> ${user_info.role}`;
user_wallet.innerHTML =` <b>Wallet:</b> $${user_info.total_amount}`;
user_product.innerHTML = `<b>Cart:</b> ${user_info.cart}`;
user_id_container.innerHTML = `<b>ID:</b> ${user_id}`;
greeting.innerHTML = `Hi, ${user_name_string.slice(0,10)} !`

if (user_info.role === "User") {
    ava.src = "/assets/imgs/user_default_ava.png"
} else 
    ava.src = "/assets/imgs/admin_default_ava.png";

change_but.addEventListener("change", function(){
        const reader = new FileReader();
        reader.addEventListener("load",()=>{
            uploaded_image = reader.result;
            ava.src= `${uploaded_image}`;
        })
        reader.readAsDataURL(this.files[0]);
    })
if (user_info.phone!==""){
    let nation = JSON.parse(localStorage.getItem("currentNation"));
    user_nation.innerHTML = `<b>Nation:</b> ${nation.name}`
    user_number.innerHTML = `<b>Number:</b> (${nation.phoneCode}) ${user_info.phone.slice(1,user_info.phone.length)}`;

    const eye_open_register = document.getElementById("eye_open_register");
    const eye_close_register = document.getElementById("eye_close_register");
    eye_open_register.addEventListener("click", (e)=>{
        eye_close_register.style.display = "inline-block";
        eye_open_register.style.display = "none";
        user_pwd.innerHTML = `<b>Password:</b> ${user_info.password.replace(/./g, 'x')}`;
        user_number.innerHTML = `<b>Number:</b> (${nation.phoneCode.replace(/./g, 'x')}) ${user_info.phone.slice(1,user_info.phone.length).replace(/./g, 'x')}`;
    })
    eye_close_register.addEventListener("click", (e)=>{
        eye_close_register.style.display = "none";
        eye_open_register.style.display = "inline-block";
        user_pwd.innerHTML = `<b>Password:</b> ${user_info.password}`;
        user_number.innerHTML = `<b>Number:</b> (${nation.phoneCode}) ${user_info.phone.slice(1,user_info.phone.length)}`;
})
}
let back_btn = document.getElementById("back-btn");
let back_shop = document.getElementById("back-shop");
back_btn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default anchor tag behavior
    if (user_info.role === "User") {
        location.replace("/user/home_user.html");
    } else {
        location.replace("/admin/home_admin.html");
    }
});
back_shop.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default anchor tag behavior
    if (user_info.role === "Admin") {
        location.replace("/user/shop.html");
    } else {
        location.replace("/admin/shop_admin.html");
    }
});
var img_link = "/assets/imgs/user_default_ava.png";
var uploaded_image = "";
localStorage.setItem("current_image","/assets/imgs/user_default_ava.png")



let history_items = JSON.parse(localStorage.getItem("user_test"));
let history_time = JSON.parse(localStorage.getItem("user_time"));
// for (let i = 0; i <history_time.length;i++ ){
//     console.log(history_items[i]);
//     console.log(history_time[i]);
// }
if (history_items !== null)
fetch('./shop.json')
.then((response) => response.json())
.then((json) => {
    let jsonContainer = json;
    for (let index = 0; index < history_time.length; index++) {
        let countObj =history_items[index];
        // console.log(history_time[i]);
        for (const i in countObj){
        let li = document.createElement("li");
        li.innerHTML = `
        <div class="items" style="display: flex;">
        <img src="${jsonContainer[i].image_url}" style="width: 108px; height: 108px;" alt="" class = "items_image">
        <div class="items_info" style="width: 100%;">
        <div style="display: flex; justify-content: space-between; width: 100%;">
        <h3 class = "items_name">${jsonContainer[i].product_name}</h3>
        <p class="items_time">${history_time[index]}</p>
        </div>
        <div style="display: flex; justify-content: space-between; width: 100%;">
        <p class="items_prices">${jsonContainer[i].price}</p>
        <p class="items_quantity">${countObj[`${i}`]}</p>
        </div>
        </div>
        </div>`
        document.getElementById("history_list").appendChild(li)
        }
        document.getElementById("history_list").appendChild(document.createElement("hr"));
    }
})

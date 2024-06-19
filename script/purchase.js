var total_price = 0;
fetch('/assets/json/shop.json')
.then((response) => response.json())
.then((json) => {
    let products_check = {}
    jsonContainer = json;
    let cartItems = JSON.parse(localStorage.getItem("user_cart"));
    let countObj = {};
    let test_history = [];
    let time_history = [];
    if (localStorage.getItem("user_test")!==null){
        test_history = JSON.parse(localStorage.getItem("user_test"));
        time_history = JSON.parse(localStorage.getItem("user_time"));
    }
    for (let i of cartItems){
        // Count the number of each item in the array
        if (countObj[i]) {
            countObj[i]++;
        } else {
            countObj[i] = 1;
        }
    }
    test_history.unshift(countObj)
    let hour = JSON.stringify(new Date().getHours()).length > 1 ? JSON.stringify(new Date().getHours()): "0"+new Date().getHours();
    let minute = JSON.stringify(new Date().getMinutes()).length > 1 ? JSON.stringify(new Date().getMinutes()): "0"+new Date().getMinutes();
    let second = JSON.stringify(new Date().getSeconds()).length > 1 ? JSON.stringify(new Date().getSeconds()): "0"+new Date().getSeconds();
    let time = `${hour}:${minute}:${second}`
    time_history.unshift(time);
    let count = 0;
    for (let i in countObj){
        let li = document.createElement("li");
        li.innerHTML =`
        <div class="items" style="display: flex;">
        <img src="${jsonContainer[i].image_url}" style="width: 108px; height: 108px;" alt="" class = "items_image">
        <div class="items_info" style="width: 100%;">
        <h3 class = "items_name">${jsonContainer[i].product_name}</h3>
        <div style="display: flex; justify-content: space-between; width: 100%;">
        <p class="items_prices">${jsonContainer[i].price}</p>
        <p class="items_quantity">${countObj[`${i}`]}</p>
        </div>
        </div>
        </div>
        <br>
        <hr>`;
        document.getElementById("history_list").appendChild(li)
        count++;
        total_price += parseFloat(jsonContainer[i].price.slice(1,jsonContainer[i].price.length)) * countObj[i];
    }
    let admin_income = total_price;
    if (localStorage.getItem("admin_income") !== null){
        admin_income = JSON.parse(localStorage.getItem("admin_income")) + total_price;
    }
    let currentId = localStorage.getItem("current_id");
    let user_property = JSON.parse(localStorage.getItem(currentId));
    let user_price = user_property.total_amount;
    let role = user_property.role;
    if (role === "Admin")
        user_price += JSON.parse(localStorage.getItem("admin_income"));
    let remain_price = user_price - total_price;
    document.getElementById("user_money").innerHTML = `$ ${user_price}`;
    document.getElementById("total_price").innerHTML = `$ ${total_price}`;
    console.log(document.getElementById("total_price").textContent);
    document.getElementById("remain_price").innerHTML = `$ ${remain_price}`;
    let user = JSON.parse(localStorage.getItem(currentId))
    user.cart += cartItems.length;
    if (role === "Admin")
        localStorage.setItem("admin_income",0);
    else
    localStorage.setItem("admin_income",admin_income);
    user.total_amount = remain_price;
    document.getElementById("purchase").addEventListener("click",(e)=>{
        localStorage.setItem("user_test",JSON.stringify(test_history));
        localStorage.setItem("user_time",JSON.stringify(time_history));
        remain_price < 0 ? alert("Error") : alert("Succesful");
        // document.getElementById("user_money").innerHTML = `$ ${remain_price}`;
        localStorage.setItem(currentId,JSON.stringify(user))
        if (user_property.role === "User")
            location.replace("/user/shop.html")
        else location.replace("/admin/shop_admin.html");
    })
})
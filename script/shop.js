//SAVE ITEM CHECK
const checkboxes = document.querySelectorAll(".checkboxInput");

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        const label = this.nextElementSibling; // Get the label next to the checkbox
        if (this.checked) {
            label.classList.add("checked");
        } else {
            label.classList.remove("checked");
        }
    });
});


//CHECK LINK VALIDATION
// const imageUrlPattern = /\bhttps?:\/\/.*\.(?:png|jpg|jpeg|gif)\b/;
// const linkToCheck = "https://shop.spacex.com/cdn/shop/files/STARSHIPFLIGHT3_UNISEX-BLACK-BACK_900x.png?v=1706825113";

// function isValidImageLink(link) {
//     return imageUrlPattern.test(link);
// }
// function isAllNumbers(input) {
//     const pattern = /^\d+(\.\d+)?$/;
//     return pattern.test(input);
// }

// admin_button.addEventListener("click", async (event) => {
//     event.preventDefault();
//     const res = await fetch(`./shop.json`);
//     const data = await res.json()

//     const image_url = document.getElementById("image_url").value;
//     const product_name = document.getElementById("product_name").value;
//     const details = document.getElementById("details").value;
//     const price = document.getElementById("price").value;
//     if (isValidImageLink(`${image_url}`) && product_name !== "" && details !== "" && isAllNumbers(`${price}`)) {
//         const new_items = {
//             "image_url": image_url,
//             "product_name": product_name,
//             "details": details,
//             "price": price
//         }
//         data.unshift(new_items);
//         var jsonContainer = data;
//         for (let i = 0; i < 9; i++) {
//             products_name[i].innerHTML = jsonContainer[i].product_name;
//             products_details[i].innerHTML = `Details: <br> ${jsonContainer[i].details}`;
//             products_image[i].src = jsonContainer[i].image_url;
//             products_price[i].setAttribute("data-tooltip", jsonContainer[i].price)
//         }
//     }
//     else {
//         alert("error");
//     }

//     document.getElementById("image_url").value = "";
//     document.getElementById("product_name").value = "";
//     document.getElementById("details").value = "";
//     document.getElementById("price").value = "";

// })


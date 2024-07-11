//NAVBAR
let model_container = document.getElementById("model-container");
var off_canva = document.getElementById("navbar-side--container");
function off_canvaOpen(){
    off_canva.style.display = "flex";
    off_canva.classList.add('slide-in');
    model_container.style.display = "block";
}
function off_canvaClose(){
    off_canva.classList.remove('slide-in');
    off_canva.classList.add('slide-out');
    setTimeout( () => {
        off_canva.classList.remove('slide-out');
        off_canva.style.display = 'none';
        model_container.style.display = "none";
    },2000)}


// CAROSEUL
let caroseul_container = document.getElementById("caroseul-container");
let caroseul_items = document.querySelectorAll(".caroseul-items");
let i = 1;
setInterval( () => {
    let caroseul_list = document.getElementById("caroseul-list");
    caroseul_list.style.transform = `translateX(-${i*33.33}%)`;
    i++;
    if (i>2) i = 0;
},3000)



//BACK TO TOP FUNCTION
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//SEND EMAIL
document.addEventListener("DOMContentLoaded", () => {
    const email_input = document.querySelector("#user_email_input");
    const submit_button = document.querySelector("#user_email_submit")
    submit_button.addEventListener("click", (e) => {
        e.preventDefault();
        const data = {
            email: email_input.value
        };
        if(email_input.value.indexOf("@") !== -1){
            postGoogle(data)
        }
    });
    async function postGoogle(data) {
        const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSe0h6Ige022p1M3yI4uswKE2THIpjkgbTbSosH4kapQez6IHg/formResponse";
        const formData = new FormData();
        formData.append("entry.1390832504", data.email)
        await fetch(formURL, {
            method: "POST",
            body: formData,
        })
    }
    submit_button.addEventListener('click', function (event) {
    event.preventDefault();
    email_input.value = '';
});
}
)

{/* <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCka1Tb7vtqNqfyieiB7wyE9gEp7wC3NDg",
    authDomain: "astronomyx-space.firebaseapp.com",
    projectId: "astronomyx-space",
    storageBucket: "astronomyx-space.appspot.com",
    messagingSenderId: "817695494145",
    appId: "1:817695494145:web:a6a21426574e005392b000"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script> */}
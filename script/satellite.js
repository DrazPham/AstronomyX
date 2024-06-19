//LAUNCH SPACECRAFT
function startAnimation() {
    let p = document.createElement("span");
    p.classList.add("loader");
    p.classList.add('animateLoader');
    p.style.animation = 'animloaderBack 3s ease-in';
    p.style.animation = 'animloaderBack 3s ease-in';
    document.querySelector(".space_launch_envi").appendChild(p);
    setTimeout((e) => { p.style.display = "none" }, 2900)
    let audio = new Audio("windblow.mp3");
    audio.play();
}


let space_envi = document.querySelector(".space_launch_envi");
let rect = space_envi.getBoundingClientRect();

// Get current scroll position
let scrollTop =  document.documentElement.scrollTop || document.body.scrollTop;
let scrollLeft =  document.documentElement.scrollLeft || document.body.scrollLeft;

// Calculate coordinates relative to the body
let space_envi_coordinate_top = rect.top + scrollTop;



window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > (space_envi_coordinate_top + 50 ) || document.documentElement.scrollTop > (space_envi_coordinate_top + 50 )) {
        space_envi.style.opacity = "1";
        
    } 
    else {
        space_envi.style.opacity = "0";

    }
}

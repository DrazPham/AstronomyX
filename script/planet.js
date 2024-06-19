$.ajax({
    url:"https://api.nasa.gov/planetary/apod?api_key=Uj6bhtCCwBURw88HFweWSMbC9d0fL5w6kW1rcnb2",
    success:function(whatyougot){
        document.getElementById("planet_title").innerHTML = whatyougot.title;
        document.getElementById("planet_explanation").innerHTML = whatyougot.explanation;
        document.getElementById("planet_date").innerHTML = `- ${whatyougot.date.split("-").reverse().join("/")}`;
        document.getElementById("planet_image").src = whatyougot.hdurl;

        if(whatyougot.copyright === undefined){
            document.getElementById("planet_author").style.display = "none";
        }
        else{
            document.getElementById("planet_author").innerHTML = `By ${whatyougot.copyright}`
        }
    }
})


///SECTION
//NAVBAR
var off_canva_section = document.getElementById("navbar-side--container-section")
console.log(off_canva_section);
function sectionOpen(){
    off_canva_section.style.display = "flex";
    off_canva_section.classList.add('slide-in-sec');
}
function sectionClose(){
    off_canva_section.classList.remove('slide-in');
    off_canva_section.classList.add('slide-out-sec');
    setTimeout( () => {
        off_canva_section.classList.remove('slide-out-sec');
        off_canva_section.style.display = 'none';
    },2000)}


//PLANET INFORMATION UPDATING
const fetchAPI = async() => {
    const responsive =  await fetch(`/assets/json/planets.json`)
    let data = await responsive.json();
    var jsonContainer = data;
    console.log(jsonContainer[0]);
    for (i in jsonContainer){
        let planet_info = document.createElement("div");
        planet_info.setAttribute("id",`${jsonContainer[i].title}_info`)
        planet_info.classList.add("card-container")
        let planets_container = document.getElementById("planets_container");
        planet_info.innerHTML = `
        <img src="${jsonContainer[i].image_url}"
        class="card-img-top" alt="${jsonContainer[i].title}">
        <div class="card-body">
        <h5 class="card-title">${jsonContainer[i].title}</h5>
        <p class="card-text">${jsonContainer[i].details}</p>
    </div>`
    planets_container.appendChild(planet_info);
    }}
    fetchAPI();

//SLIDER
var slider = document.getElementById("myRange");
// Update the CSS variable value whenever the slider value changes
slider.oninput = function () {
    var orbitValue = this.value + 's'; // Assuming the value should be in seconds
    document.documentElement.style.setProperty('--earth-orbit', orbitValue);
}
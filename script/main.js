//NEWS API


//https://api.spaceflightnewsapi.net/v4/blogs/ (BLOG)

//https://api.spaceflightnewsapi.net/v4/articles/ (articles)

//https://api.spaceflightnewsapi.net/v4/reports/ (reports)

//https://api.spaceflightnewsapi.net/v4/info/ (website info)


//BLOG UPDATING
const fetchBlog = async ()=>{
    const responsive =  await fetch(`https://api.spaceflightnewsapi.net/v4/blogs/`);
    let data = await responsive.json();
    let container = document.getElementById("blogs-list");
    let newArr = [];
    for (let i = 0 ; i< 3 ; i++)
    newArr.push(data.results[i]);
    let blogs_list = document.getElementById("blogs-list");
    for (i in newArr){
        let blog = document.createElement("li");
        blog.innerHTML =
        `
        <li>
            <a href= ${newArr[i].url}>
                <img src=${newArr[i].image_url}>
                    <div>
                        <h6>${newArr[i].title}</h6>
                        <p>${newArr[i].summary}</p>
                        <small>${newArr[i].news_site}</small> -
                        <small>${newArr[i].published_at.slice(0,10).split("-").reverse().join("/")}</small>
                    <div>
            </a>
        </li>
        <hr>
        `
    blogs_list.appendChild(blog);
    }
}
fetchBlog();

//NEWS DECLARATION
const news_title_list = document.getElementsByClassName("news-title");
const news_date_list = document.getElementsByClassName("news-date");
const news_image_list = document.getElementsByClassName("news-image");
const news_link_list = document.getElementsByClassName("news-link");
const news_summary_list = document.getElementsByClassName("news-summary");
const news_author_list = document.getElementsByClassName("news-author");
const news_container = document.getElementsByClassName("news-items");

//NEWS UPDATING
const fetchNews = async() => {
    const responsive1 =  await fetch(`https://api.spaceflightnewsapi.net/v4/reports/`)
    const responsive2 =  await fetch(`https://api.spaceflightnewsapi.net/v4/articles/`)
    let data1 = await responsive1.json();
    let data2 = await responsive2.json();
    let container = document.getElementById("post-container");
    let newArr = [];
    for (let i = 0 ; i< 5 ; i++){
        if (i*2+1>10) break;
        newArr.push(data1.results[i]);
        newArr.push(data2.results[i]);
    }
    for (i in newArr){
        let news = document.createElement("li");
        news.innerHTML =
        `
        <li class = "news-items">
            <a href= ${newArr[i].url} class = "news-link">
                <img src=${newArr[i].image_url} class = "news-image">
                    <div>
                        <h6 class = "news-title">${newArr[i].title}</h6>
                        <p class = "news-summary">${newArr[i].summary}</p>
                        <small class = "news-author">${newArr[i].news_site}</small> -
                        <small class = "news-date">${newArr[i].published_at.slice(0,10).split("-").reverse().join("/")}</small>
                    <div>
            </a>
        </li>
        `
        container.appendChild(news);
    }

    localStorage.setItem("currentPosts",JSON.stringify(newArr));
}
fetchNews();

// NEWS SEARCHING
let searchInput = document.querySelector("#navbar-full-search");
searchInput.addEventListener("change", ()=>{
    for (i in news_container){
        news_title_list[i].innerHTML = "";
    }
    let constArr = JSON.parse(localStorage.getItem("currentPosts"));
    
    if (searchInput.value !== ""){
        let filterArr = constArr.filter((e)=> e.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) !==-1 );
        for (i in filterArr){
            news_title_list[i].innerHTML = filterArr[i].title;
            news_summary_list[i].innerHTML = filterArr[i].summary;
            news_date_list[i].innerHTML = filterArr[i].published_at.slice(0,10).split("-").reverse().join("/")
            news_image_list[i].src = filterArr[i].image_url;
            news_author_list[i].innerHTML = `By ${filterArr[i].news_site}`
            news_link_list[i].href = filterArr[i].url;
        }
    }
    else {
        let arrStorage = JSON.parse(localStorage.getItem("currentPosts"));
        for (let i = 0 ; i< arrStorage.length;i++){
            news_summary_list[i].innerHTML = arrStorage[i].summary;
            news_date_list[i].innerHTML = arrStorage[i].published_at.slice(0,10).split("-").reverse().join("/")
            news_image_list[i].src = arrStorage[i].image_url;
            news_author_list[i].innerHTML = `${arrStorage[i].news_site}`
            news_link_list[i].href = arrStorage[i].url;
            news_title_list[i].innerHTML = arrStorage[i].title;
        }
    }
    for (let i in news_container){
        news_title_list[i].textContent === ""  ? news_container[i].style.display = "none" : news_container[i].style.display = "flex";
    }
})


function toggleMessage() {
    var messageBox = document.getElementById('messageBox');
    messageBox.style.display = (messageBox.style.display === 'block') ? 'none' : 'block';
}

document.getElementById("chat_btn").addEventListener("click",(e)=>{
    let chatbox = document.getElementById("messageBox");
    chatbox.style.overflowY = "auto";
    chatbox.style.overflowX = "hidden";
    chatbox.style.width += "20rem";
    chatbox.style.height += "40%";
    document.getElementById("chat_btn").style.display = "none";
    document.getElementById("chat_intro").style.fontSize = "150%";
    document.getElementById("chat_greeting").style.fontSize = "105%";
    document.getElementById("chat_greeting").style.background = "linear-gradient(to bottom, #8a2be2 0%, #ff69b4 100%)";
    document.getElementById("chat_greeting").style.color = "white";
    document.getElementById("chat_greeting").style.display = "inline-block";
    document.getElementById("chat_greeting").style.padding =  "5px 10px";
    document.getElementById("chat_greeting").style.borderRadius =  "20px";
    document.getElementById("chat_greeting").style.borderBottomLeftRadius =  "0";
    
    let questionsArr = [
        "What are those function involved in this website?",
        "What is the topic of this website?",
        "Who is this website reserved to?"
    ]
    let answersArr = [
        "Summary news, commercial, theories,...",
        "It is mainly about Astronomy and outter space",
        "The copyright is reserved to Pham Bui Gia Bao"
    ]
    let chatbox_chat = document.getElementById("chatbox_chat")
    for (let index = 0 ; index < 3 ; index++){
        let i = document.createElement("p");
        i.classList.add("userQuestions")
        i.innerHTML = `${questionsArr[index]}`;
        i.style.color = "white";
        i.style.fontSize = "105%";
        i.style.background = "grey";
        i.style.display = "inline-block";
        i.style.position = "relative";
        i.style.right = "0";
        // i.style.top = `$rem`;
        i.style.bottom = "0";
        i.style.padding =  "5px 10px";
        i.style.borderRadius =  "20px";
        i.style.borderBottomRightRadius = "0px";
        i.style.float = "right";
        i.style.float = "bottom";
        i.style.marginTop = "10px";
        chatbox_chat.appendChild(i);
    }
    let userQuestions = document.querySelectorAll(".userQuestions");
    // let newArr = [...questionsArr];
    // let inputArr = newArr;
    for (let i = 0 ; i < 3 ; i++){
        userQuestions[i].addEventListener("click",(e)=>{
            //question
            // newArr = newArr.filter((e)=> e != userQuestions[i]);
            let k = document.createElement("p");
            k.classList.add("userQuestions")
            k.innerHTML = `${questionsArr[i]}`;
            k.style.color = "white";
            k.style.fontSize = "105%";
            k.style.background = "linear-gradient(to bottom, #8A2BE2 0%, #0000FF 100%)";
            k.style.display = "inline-block";
            k.style.padding =  "5px 10px";
            k.style.borderRadius =  "20px";
            k.style.float = "right";
            k.style.borderBottomRightRadius = "0px";
            k.style.flex = "1";
            k.style.marginTop = "10px";
            // k.style.float = "top";
            chatbox_chat.appendChild(k);
            //answer
            userQuestions[i].style.display = "none";
            let j = document.createElement("p");
            j.classList.add("adminAnswers")
            j.style.fontSize = "105%";
            j.innerHTML = `${answersArr[i]}`;
            j.style.color = "white";
            j.style.background = "linear-gradient(to bottom, #8a2be2 0%, #ff69b4 100%)";
            j.style.display = "inline-block";
            j.style.padding =  "5px 10px";
            j.style.borderRadius =  "20px";
            j.style.float = "left";
            j.style.marginTop = "10px";
            // j.style.float = "top";
            // j.style.position = "relative";
            j.style.borderBottomLeftRadius = "0px";   
            chatbox_chat.appendChild(j);
    // for (test of newArr){
    //     let o = document.createElement("p");
    //     o.classList.add("userQuestions")
    //     o.innerHTML = `${test}`;
    //     o.style.color = "black";
    //     o.style.fontSize = "105%";
    //     o.style.backgroundColor = "blue";
    //     o.style.display = "inline-block";
    //     o.style.position = "relative";
    //     o.style.right = "0";
    //     // o.style.top = `$rem`;
    //     o.style.bottom = "0";
    //     o.style.padding =  "5px 10px";
    //     o.style.borderRadius =  "20px";
    //     o.style.borderBottomRightRadius = "0px";
    //     o.style.float = "right";
    //     o.style.float = "bottom";
    //     chatbox_chat.appendChild(o);
    // }
})
    }

})



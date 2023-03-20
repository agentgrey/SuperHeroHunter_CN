// console.log("script.js working");

// variables created from index.html
var searchBar = document.getElementById("searchbar");
var searchResults = document.getElementById("searchresults");

// event listener for searchbar
searchBar.addEventListener("input", () => searchHeros(searchBar.value));

// function for API call
async function searchHeros(heroname) {
    console.log("i am in searchHeros " +heroname); 

// if input is non empty
    if(heroname.length > 0) {
        let url="https://gateway.marvel.com/v1/public/characters?nameStartsWith="+heroname+"&limit=8&ts=1&apikey=479af95fea303989d02e4a22757147e7&hash=b837dd71ea30a412d884f205f4da646f";

        await fetch(url).then(function (response) {
                        return response.json()
                    })
                    .then(function (data) {
                        showResults(data);
                    });;
    } 
// if input is empty
    else {
        console.log("empty");
        searchResults.innerHTML = "";
    }
}

// function for displaying search results
function showResults(d) {
    console.log("i am in showResults");
    res = d.data.results;
    console.log(res);

    let html=``;
    if(res) {
        html = res.map(element => {
            return `
                <div class="card">
                <img id="poster" class="poster" src="${element.thumbnail.path+'/portrait_medium.' + element.thumbnail.extension}">
                <div class="details">
                <a href="single.html" style="text-decoration: none; color: inherit;">
                    <p id="cardName" class="cardName"> ${element.name} </p>
                    <div style="display:none;">
                        <span>${element.name}</span>
                        <span>${element.description}</span>
                        <span>${element.comics.available}</span>
                        <span>${element.series.available}</span>
                        <span>${element.stories.available}</span>
                        <span>${element.thumbnail.path+'/portrait_uncanny.' + element.thumbnail.extension}</span>
                        <span>${element.id}</span>
                        <span>${element.thumbnail.path+'/landscape_incredible.' + element.thumbnail.extension}</span>
                        <span>${element.thumbnail.path+'/standard_fantastic.' + element.thumbnail.extension}</span>
                </div>
                </a>
                
                <div class="icon">
                    <i class="heart-icon fa-regular fa-heart"></i>
                    <i class="heart-icon fa-solid fa-heart"></i>
                </div>
                </div>
                </div>
            `
        }).join('');
        searchResults.innerHTML = html;
    } else {
        searchResults.innerHTML = "";
    }

// if searchBar is empty then show nothing in searchResults
    if(searchBar.value.length==0) {
        console.log("empty in searchResults")
        searchResults.innerHTML = "";
    }
    events();
}



// Function for attacthing eventListener to buttons
function events() {
     let characterInfo = document.querySelectorAll(".cardName");
     characterInfo.forEach((character) => addEventListener('click', openSinglePage(character)))
}

// Function which stores the info object of character for which user want to see the info 
function openSinglePage(c) {
// This function basically stores the data of character in localStorage.
// When user clicks on the name, the info page is opened that fetches the heroInfo and displays the data  
// console.log("in openSinglePage");
// console.log(c.parentElement.children[1]);
     let heroInfo = {
         name: c.innerHTML, desc: c.parentElement.children[1].children[1].innerHTML, comic: c.parentElement.children[1].children[2].innerHTML, series: c.parentElement.children[1].children[3].innerHTML, stories: c.parentElement.children[1].children[4].innerHTML, img: c.parentElement.children[1].children[5].innerHTML
     }
    // console.log(heroInfo);
     localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}
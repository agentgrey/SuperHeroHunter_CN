
// Variables created from index.html
var searchBar = document.getElementById("searchbar");
var searchResults = document.getElementById("searchresults");

// Event listener for searchbar
searchBar.addEventListener("input", () => searchHeros(searchBar.value));

// Function for API call
async function searchHeros(heroname) {

// If input is non empty
    if(heroname.length > 0) {
        let url="https://gateway.marvel.com/v1/public/characters?nameStartsWith="+heroname+"&limit=8&ts=1&apikey=479af95fea303989d02e4a22757147e7&hash=b837dd71ea30a412d884f205f4da646f";

        await fetch(url).then(function (response) {
                        return response.json()
                    })
                    .then(function (data) {
                        showResults(data);
                    });;
    } 
// If input is empty
    else {
        searchResults.innerHTML = "";
    }
}

// Function for displaying search results
function showResults(d) {

    let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
     if(favouritesCharacterIDs == null){
// If we did't got the favouritesCharacterIDs then we iniitalize it with empty map
          favouritesCharacterIDs = new Map();
     }
     else if(favouritesCharacterIDs != null){
// If the we got the favouritesCharacterIDs in localStorage then parsing it and converting it to map
          favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
     }

    res = d.data.results;
    let html=``;

    if(res) {
        html = res.map(element => {
            return `
                <div class="card">
                <img id="poster" class="poster" src="${element.thumbnail.path+'/portrait_medium.' + element.thumbnail.extension}">
                <div class="details">
                    <p id="cardName" class="cardName"> ${element.name} </p>
                    <div style="display:none;">
                        <span>${element.name}</span>
                        <span>${element.description}</span>
                        <span>${element.comics.available}</span>
                        <span>${element.series.available}</span>
                        <span>${element.stories.available}</span>
                        <span>${element.thumbnail.path+'/portrait_uncanny.' + element.thumbnail.extension}</span>
                        <span>${element.id}</span>
                    </div>                
                    <div class="icon">
                        <i class="${favouritesCharacterIDs.has(`${element.id}`) ? "heart-icon fa-solid fa-heart" 
                        :"heart-icon fa-regular fa-heart"}" ></i>
                    </div>
                </div>
                </div>
            `
        }).join('');
        searchResults.innerHTML = html;
    } 
// No result found
    else {
        searchResults.innerHTML = "No results found";
    }
}

// Function for attacthing eventListener to buttons
document.addEventListener('click', e => {
    let target = e.target;

// If user clicks on heart, add/remove to favorites
    if(target.classList.contains("heart-icon")) {
        addToFavorites(target);
    }

// If user clicks on the name, open single page
    if(target.classList.contains("cardName")) {
        openSinglePage(target);
        window.open("./single.html", "_blank");
    }
})

// Function which adds and removes the item to favorites list
function addToFavorites(c) {
    let heroInfo = {
        name: c.parentElement.parentElement.children[1].children[0].innerHTML,
        desc: c.parentElement.parentElement.children[1].children[1].innerHTML, 
        comics: c.parentElement.parentElement.children[1].children[2].innerHTML, 
        series: c.parentElement.parentElement.children[1].children[3].innerHTML, 
        stories: c.parentElement.parentElement.children[1].children[4].innerHTML,
        img: c.parentElement.parentElement.children[1].children[5].innerHTML,
        id: c.parentElement.parentElement.children[1].children[6].innerHTML
    }
// If hero is not added to favorites, add to favorites
    if(c.getAttribute('class')=='heart-icon fa-regular fa-heart') {        
        

        let favouritesArray = localStorage.getItem("favouriteCharacters");
        if (favouritesArray == null) {
            favouritesArray = [];
        } else {
            favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
        }

        let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
        if (favouritesCharacterIDs == null) {
            favouritesCharacterIDs = new Map();
        } else {
            favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
        }

        favouritesCharacterIDs.set(heroInfo.id, true);   
        favouritesArray.push(heroInfo);
        localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
        localStorage.setItem("favouriteCharacters", JSON.stringify(favouritesArray));

        c.setAttribute('class', 'heart-icon fa-solid fa-heart');
    }   
// If hero is already in favoritets, remove from favorites
    else {
        let favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
        let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
        let newFavouritesArray = [];
        favouritesCharacterIDs.delete(`${heroInfo.id}`);
        favouritesArray.forEach((favourite) => {
            if(heroInfo.id != favourite.id){
                newFavouritesArray.push(favourite);
            }
        });

        localStorage.setItem("favouriteCharacters",JSON.stringify(newFavouritesArray));
        localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
          
        c.setAttribute('class', 'heart-icon fa-regular fa-heart');
    }
}

// Function which stores the info object of character for which user want to see the info 
function openSinglePage(c) {
// This function basically stores the data of character in localStorage.
// When user clicks on the name, the info page is opened that fetches the heroInfo and displays the data 

    let heroInfo = {
        name: c.innerHTML, desc: c.parentElement.children[1].children[1].innerHTML, 
        comic: c.parentElement.children[1].children[2].innerHTML, 
        series: c.parentElement.children[1].children[3].innerHTML, 
        stories: c.parentElement.children[1].children[4].innerHTML, 
        img: c.parentElement.children[1].children[5].innerHTML,
        id: c.parentElement.children[1].children[6].innerHTML
    }
// Add to local storage
    localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}




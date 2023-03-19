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
    // console.log(res);

    let html=``;
    if(res) {
        html = res.map(element => {
            return `
                <div class="card">
                <img id="poster" class="poster" src="${element.thumbnail.path+'/portrait_medium.' + element.thumbnail.extension}">
                <div class="details">
                <a href="single.html" style="text-decoration: none; color: inherit;">
                <p id="card-name" class="card-name"> ${element.name} </p></a>
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
}
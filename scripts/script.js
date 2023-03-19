console.log("script.js working");

// PUBLIC KEY
let privateKey= "c6aaa062a457b78d8f89781c181dc663c580d020";

// PRIVATE KEY
let publicKey = "39908c7590bdb2b8949f4df91087a9b8";

// let ts = new Date().getTime();
// var MD5 = require("crypto-js/md5"); 
// console.log(MD5("text to hash").toString());

// HASH
let hash = "27703945b9bceacb09546d2e103ad360";




// variables created from index.html
var searchBar = document.getElementById("searchbar");
var searchResults = document.getElementById("searchresults");

// event listener for searchbar
searchBar.addEventListener("input", () => searchHeros(searchBar.value));

// function for API call
async function searchHeros(heroname) {
    // console.log("i am in searchHeros"); 

    // API call to get data
    // showResults(heroname);
    await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${heroname}&apikey=${publicKey}&hash=${hash}`);
}

// function for displaying search results
function showResults(heroname) {
    console.log(heroname);
}
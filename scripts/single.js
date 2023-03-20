// console.log("i am in single.js")

let heroInfo = JSON.parse(localStorage.getItem("heroInfo"));

// variables from single.html
var title = document.getElementById("title");
var photo = document.getElementById("photo");


title.innerHTML =  heroInfo.name;
photo.setAttribute("src", heroInfo.img);
console.log(heroInfo);
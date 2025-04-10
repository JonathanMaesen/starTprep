let nav = document.createElement("nav");
nav.style.minWidth = "8vw";
nav.style.minHeight = "100vh"; 
nav.style.height = "auto";
nav.style.backgroundColor = "#101434";
nav.style.display = "flex";
nav.style.flexDirection = "column";
nav.style.alignItems = "center";
nav.style.gap = "2vh";
nav.style.position = "relative";
nav.style.left = "0";
nav.style.top = "0";
nav.style.bottom = "0";

document.body.appendChild(nav);


nav.style.overflowY = "auto";  
nav.style.overflowX = "hidden"; 
nav.style.padding = "1vh";    
let buttons = [
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("button")
];

let images = [
    { src: "./assets/nav/home button.png", link: "login.html?u=back" },
    { src: "./assets/nav/opslag button.png", link: "opslag.html" },
    { src: "./assets/nav/recept button.png", link: " recipes.html" },
    { src: "./assets/nav/Group 15.png", link: "frontOfHouse.html" },
    { src: "./assets/icon/table icoon.png", link: "makefloor.html" }
];

for (let i = 0; i < buttons.length; i++) {
  let img = document.createElement("img");
  img.src = images[i].src;

  buttons[i].appendChild(img);
  buttons[i].style.borderRadius = "50%";
  buttons[i].style.height = "10vh";
  buttons[i].style.width = "10vh";
  buttons[0].style.marginTop = "5vh";
  buttons[i].style.cursor = "pointer"
  buttons[i].onclick = function (event) {
    window.location.href = images[buttons.indexOf(event.currentTarget)].link;
  };
    nav.appendChild(buttons[i]);
}

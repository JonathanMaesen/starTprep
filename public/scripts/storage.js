let showFilter = false;
const filter = document.getElementById("dropdown-content");
filter.style.display = "none";

function ShowFilter() {
  if (showInfo == false) {
    filter.style.display = "block"
    showInfo = true;
  }
  else {
    filter.style.display = "none"
    showInfo = false;
  }
}

let showInfo = false;
const info = document.getElementById("Info");
info.style.display = "none";

function ShowInfo() {
  if (showInfo == false) {
    info.style.display = "block"
    showInfo = true;
  }
  else {
    info.style.display = "none"
    showInfo = false;
  }
}

function Add() {
  const ingredient = document.createElement("button");
  ingredient.addEventListener("click", ShowInfo);
  ingredient.style.marginRight = "10px";

  const img = document.createElement("img");
  img.src = "assets/opslag/placeholder.png";
  ingredient.appendChild(img);

  const container = document.getElementById("Ingrediënten");
  container.insertBefore(ingredient, container.lastElementChild);
}

window.Add = Add;
window.ShowInfo = ShowInfo;
window.ShowFilter = ShowFilter;
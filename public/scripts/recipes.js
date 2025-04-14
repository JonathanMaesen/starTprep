// TODO'S:
// GRID ITEM FIXEN
// JUISTE JSON BENAMING
// LOAD DEFAULT RECIPES   DONE

const gridItems = document.querySelectorAll(".grid-item");
const popupOverlay = document.getElementById("popupOverlay");
const popupContent = document.querySelector(".popup-content");
const closePopup = document.getElementById("closePopup");
const recipeNameElem = document.getElementById("recipeName");
const ingredientenList = document.getElementById("ingredientenList");
const bereidingswijzeList = document.getElementById("bereidingswijzeList");
const quantitySpan = document.getElementById("quantity");
const aankoopPrijsElem = document.getElementById("aankoopPrijs");
const verkoopPrijsElem = document.getElementById("verkoopPrijs");
const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const gridContainer = document.getElementById("gridContainer");
let currentQuantity = 1;
quantitySpan.textContent = currentQuantity;
let recipeGrid = [];
let recipeCounter = 0;

if (popupOverlay && popupContent && closePopup) {
  gridItems.forEach((item) => {
    item.addEventListener("click", function () {
      openPopup();
    });
  });

  function openPopup() {
    popupOverlay.style.display = "flex";
    popupContent.style.right = "0";
  }

  function closePopupHandler(event) {
    if (event.target === popupOverlay || event.target === closePopup) {
      popupContent.style.right = "-100%";
      setTimeout(() => {
        popupOverlay.style.display = "none";
      }, 300);
    }
  }

  function addGridItem() {
    const container = document.getElementById("gridContainer");
    if (container) {
      const newItem = document.createElement("div");
      newItem.classList.add("grid-item");
      container.appendChild(newItem);

      newItem.addEventListener("click", function () {
        openPopup();
      });
    } else {
      console.error("gridContainer niet gevonden");
    }
  }

  document.querySelector(".add-button").addEventListener("click", addGridItem);

  popupOverlay.addEventListener("click", closePopupHandler);
  closePopup.addEventListener("click", closePopupHandler);
} else {
  console.error("Benodigde elementen voor popup niet gevonden.");
}

plusBtn.addEventListener("click", () => {
  currentQuantity++;
  quantitySpan.textContent = currentQuantity;
});

minusBtn.addEventListener("click", () => {
  if (currentQuantity > 1) {
    currentQuantity--;
    quantitySpan.textContent = currentQuantity;
  }
});

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length > 2) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        searchResults.innerHTML = "";
        if (data.meals) {
          searchResults.style.display = "block";
          data.meals.forEach((meal) => {
            const resultItem = document.createElement("div");
            resultItem.textContent = meal.strMeal;
            resultItem.addEventListener("click", () => selectRecipe(meal));
            searchResults.appendChild(resultItem);
          });
        } else {
          searchResults.style.display = "none";
        }
      })
      .catch((error) =>
        console.error("Fout bij het ophalen van recepten:", error)
      );
  } else {
    searchResults.style.display = "none";
  }
});

function selectRecipe(meal) {
  if (!recipeGrid.some((r) => r.idMeal === meal.idMeal)) {
    meal.id = meal.idMeal || recipeCounter++;
    recipeGrid.push(meal);
    addRecipeToGrid(meal, meal.id);
  }
  searchResults.style.display = "none";
  searchInput.value = "";
  displayRecipeDetails(meal);
}

function addRecipeToGrid(meal, index) {
  const gridItem = document.createElement("div");
  gridItem.classList.add("grid-item");
  gridItem.textContent = meal.strMeal || meal.name;
  gridItem.dataset.id = index;

  gridItem.addEventListener("click", () => {
    const selectedMeal = recipeGrid.find((r) => r.id == index);
    if (selectedMeal) {
      displayRecipeDetails(selectedMeal);
    }
  });

  gridContainer.appendChild(gridItem);
}

function displayRecipeDetails(meal) {
  const mealName = meal.strMeal || meal.name;
  recipeNameElem.textContent = mealName;

  ingredientenList.innerHTML = "";
  if (meal.ingredients) {
    meal.ingredients.forEach((ingredient) => {
      const listItem = document.createElement("li");
      listItem.textContent = ingredient.name;
      ingredientenList.appendChild(listItem);
    });
  } else {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = `${measure} ${ingredient}`;
        ingredientenList.appendChild(listItem);
      }
    }
  }

  bereidingswijzeList.innerHTML = "";
  const instructions = meal.strInstructions || "Geen instructies beschikbaar.";
  const steps = instructions.split(". ");
  steps.forEach((step) => {
    if (step.trim() !== "") {
      const stepItem = document.createElement("li");
      stepItem.textContent = step;
      bereidingswijzeList.appendChild(stepItem);
    }
  });

  openPopup();
}

function SearchRecepts(term) {
  if (!term) {
    alert("De zoekterm is ongeldig.");
    return;
  }
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals && data.meals.length > 0) {
        selectRecipe(data.meals[0]);
      } else {
        console.error("Geen recepten gevonden.");
      }
    })
    .catch((error) => console.error("Fout bij het fetchen:", error));
}

async function LoadDefaultRecipes() {
  try {
    const response = await fetch("./tempdata/dishes.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    data.forEach((recipe, index) => {
      recipe.id = recipe.id || recipeCounter++;
      recipeGrid.push(recipe);
      addRecipeToGrid(recipe, recipe.id);
    });

    console.log("Standaard recepten geladen:", recipeGrid);
  } catch (error) {
    console.error("Fout bij laden van standaardrecepten:", error);
  }
}

window.onload = LoadDefaultRecipes;

async function Fetch_Json_File() {
  try {
    const response = await fetch("./tempdata/dishes.json");
    if (!response.ok) {
      throw new Error("Kan dishes.json niet laden.");
    }
    const data = await response.json();
    recipeGrid = data;
    console.log("Bestaande recepten geladen:", recipeGrid);
  } catch (error) {
    console.error("Fout bij laden van bestaande recepten:", error);
  }
}

Fetch_Json_File();

function saveRecipeToJSON(recipe) {
  recipeGrid.push(recipe);

  const jsonString = JSON.stringify(recipeGrid, null, 2);

  const a = document.createElement("a");
  const file = new Blob([jsonString], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.download = "dishes.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

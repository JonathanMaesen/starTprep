const popupOverlay = document.getElementById("popupOverlay");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const closePopupBtn = document.getElementById("closePopup");

let selectedGridItem = null;

document.querySelectorAll(".grid-item").forEach(item => {
    item.addEventListener("click", () => {
        selectedGridItem = item;
        popupOverlay.style.display = "block";
        searchInput.value = "";
        searchResults.innerHTML = "";

        // Als item reeds gegevens bevat → toon ze opnieuw
        const name = item.textContent;
        const ingredientsData = item.dataset.ingredients;
        const stepsData = item.dataset.steps;

        document.getElementById("recipeName").textContent = name;

        const ingredientsList = document.getElementById("ingredientenList");
        ingredientsList.innerHTML = "";

        if (ingredientsData) {
            const ingredients = JSON.parse(ingredientsData);
            ingredients.forEach(i => {
                const li = document.createElement("li");
                li.textContent = i;
                ingredientsList.appendChild(li);
            });
        }

        const stepsList = document.getElementById("bereidingswijzeList");
        stepsList.innerHTML = "";

        if (stepsData) {
            const steps = JSON.parse(stepsData);
            steps.forEach(s => {
                const li = document.createElement("li");
                li.textContent = s;
                stepsList.appendChild(li);
            });
        }
    });
});

closePopupBtn.addEventListener("click", e => {
    e.preventDefault();
    popupOverlay.style.display = "none";
});

searchInput.addEventListener("input", async () => {
    const term = searchInput.value.trim();
    if (term.length < 3) {
        searchResults.innerHTML = "";
        return;
    }

    const res = await fetch(`/recipes/search?term=${encodeURIComponent(term)}`);
    const data = await res.json();

    searchResults.innerHTML = "";
    (data.meals || []).slice(0, 5).forEach(meal => {
        const div = document.createElement("div");
        div.textContent = meal.strMeal;
        div.addEventListener("click", () => fillPopup(meal));
        searchResults.appendChild(div);
    });
});

function fillPopup(meal) {
    document.getElementById("recipeName").textContent = meal.strMeal;

    const ingredientsList = document.getElementById("ingredientenList");
    ingredientsList.innerHTML = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            const li = document.createElement("li");
            li.textContent = `${ingredient} - ${measure}`;
            ingredientsList.appendChild(li);
        }
    }

    const steps = document.getElementById("bereidingswijzeList");
    steps.innerHTML = "";
    meal.strInstructions.split('. ').forEach(step => {
        if (step.trim()) {
            const li = document.createElement("li");
            li.textContent = step.trim();
            steps.appendChild(li);
        }
    });

    if (selectedGridItem) {
    selectedGridItem.textContent = meal.strMeal;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${ingredient} - ${measure}`);
        }
    }

    const steps = meal.strInstructions
        .split('. ')
        .map(s => s.trim())
        .filter(Boolean);

    selectedGridItem.dataset.ingredients = JSON.stringify(ingredients);
    selectedGridItem.dataset.steps = JSON.stringify(steps);
    }

    searchResults.innerHTML = "";
}
let showFilter = false;
let ingredients = [];

function ShowFilter() {
    const filter = document.querySelector(".dropdown-content");
    if (filter) {
        if (showFilter) {
            filter.style.display = "none";
        } else {
            filter.style.display = "block";
        }
        showFilter = !showFilter;
    }
}

function sortByName() {
    ingredients.sort((a, b) => a.name.localeCompare(b.name));
    renderIngredients();
}

function sortByExpiryDate() {
    ingredients.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    renderIngredients();
}

function sortByQuantity() {
    ingredients.sort((a, b) => a.quantity - b.quantity);
    renderIngredients();
}

function renderIngredients() {
    const gridContainer = document.getElementById("gridContainer");
    if (gridContainer) {
        gridContainer.innerHTML = "";
        ingredients.forEach(ingredient => {
            const ingredientElement = document.createElement("article");
            ingredientElement.className = "grid-item";
            ingredientElement.textContent = ingredient.name;
            ingredientElement.addEventListener("click", () => toggleInfo(ingredient));
            gridContainer.appendChild(ingredientElement);
        });
    }
}

function toggleInfo(ingredient) {
    const info = document.querySelector(".info");
    if (info) {
        info.innerHTML = `
            <p>Naam: ${ingredient.name}</p>
            <p>Recepten: </p>
            <p>Afval: </p>
            <p>
                Hoeveelheid:
                <button class="minusBtn">-</button>
                <button class="plusBtn">+</button>
            </p>
            <p>Verval datum: ${ingredient.expiryDate}</p>
        `;
        info.style.display = "block";
    }
}

async function addIngredient() {
    try {
        const response = await fetch("/storage/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "New Ingredient", expiryDate: "N/A", quantity: 0 }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);

            const newIngredient = { name: "New Ingredient", expiryDate: "N/A", quantity: 0 };
            ingredients.push(newIngredient);
            renderIngredients();
        } else {
            console.error("Failed to add ingredient");
        }
    } catch (error) {
        console.error("Error adding ingredient:", error);
    }
}

window.ShowFilter = ShowFilter;
window.toggleInfo = toggleInfo;
window.addIngredient = addIngredient;

document.querySelectorAll(".dropdown-content button").forEach(button => {
    button.addEventListener("click", (event) => {
        const filterType = event.target.textContent;
        if (filterType === "Naam") {
            sortByName();
        } else if (filterType === "Houdbaarheidsdatum") {
            sortByExpiryDate();
        } else if (filterType === "Voorraad") {
            sortByQuantity();
        }
    });
});

document.querySelector(".addButtonTop").addEventListener("click", addIngredient);

ingredients = [
    { name: "Ingredient1", expiryDate: "2023-12-31", quantity: 10 },
    { name: "Ingredient3", expiryDate: "2023-11-30", quantity: 5 },
    { name: "Ingredient2", expiryDate: "2023-10-15", quantity: 20 },
];
renderIngredients();
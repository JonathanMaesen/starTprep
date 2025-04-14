// const arr = [1,20,5,9,10,11,2,3,4,12,13,14,15,16,17,6,7,8,18,19,21];
// const arrorder  = [...arr].sort((a, b) => a - b);
let ingredients = undefined;
let products = undefined;
let unscannedingredients = undefined;
function BinarySearch(arr, x) {
    let start = 0, end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] === x) return mid;
        else if (arr[mid] < x)
            start = mid + 1;
        else
            end = mid - 1;
    }
    return false;
}
function BinarySearchIdIgredients(x) {
    const arr = ingredients;
    let start = 0, end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid].id === x) return mid;
        else if (arr[mid].id < x)
            start = mid + 1;
        else
            end = mid - 1;
    }
    return false;
}
function BinarySearchIdProducts(x) {
    const arr = products;
    let start = 0, end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid].IngredientId === x) return mid;
        else if (arr[mid].IngredientId < x)
            start = mid + 1;
        else
            end = mid - 1;
    }
    return -1;
}
(async () => {
    const data = await Fetch_Json_File('./tempdata/products.json');
    products = await data;
})();
(async () => {
    const data = await Fetch_Json_File('../tempdata/ingredients.json');
    ingredients = await data;
    Create_Cards();
    FilterUnscannedIngredients();
})();
// Starts a for loop on all json to generate the buttons
function Create_Cards() {
    document.getElementById("Card-Container").innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        const element = products[i];
        Create_Card_Product(element, i ,"Card-Container");
    };
}
// makes product buttons based element given
function Create_Card_Product(element, i,id){
    const container = document.getElementById(id);
    const productelemenet = ingredients[BinarySearchIdIgredients(element.IngredientId)];
    container.innerHTML += `<div class="scanner-card">
    <button  onclick="ProductDetail(${i})">
    <h3>${element.Barcode}</h3>
    <p>${productelemenet.name}</p>
    </button>
    </div>`;
}
// makes the ingredient buttons based on element given
function Create_Card_Ingredient(element, i,id){
    const container = document.getElementById(id);
    container.innerHTML += `<div class="ingredient-card">
    <button onclick="FillIdingredient(${i})">
    <h4>${element.name}</h4>
    <h4>ingredient id: ${element.id}</h4>
    </button>
    </div>`;
}
const inputmodal = document.getElementById("searchModal");
const inputsearch = document.getElementById("SearchBarcodeInput");

inputmodal.addEventListener('shown.bs.modal', () => {
    inputsearch.value = "";
    inputsearch.focus();
});

inputsearch.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const DetailModal = bootstrap.Modal.getInstance(inputmodal); // Get instance dynamically
        if (DetailModal) {
            ShowFirstProduct(inputsearch.value);
        }
    }
    // if (event.key === "Enter") {
    //     const DetailModal = bootstrap.Modal.getInstance(inputmodal); // Get instance dynamically
    //     if (DetailModal) {
    //         MakeCall(inputsearch.value);
    //     }
    // }
});

async function MakeCall(searchstring) {
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${searchstring}`);
    const data = await response.json();
}

document.getElementById("SearchBarCode").addEventListener("click", function() {
    ShowFirstProduct(inputsearch.value);
});
// gives a product based on the barcode given
function ShowFirstProduct(barcode) {
    document.getElementById("search-results").innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        const element = products[i];
        if(element.Barcode == barcode){
            i = products.length;
            Create_Card_Product(element, i,"search-results");
        }
    }
}
// Filters all unscannedingredients so that we dong get double products
function FilterUnscannedIngredients() {
    let temparr = [];
    for (let i = 0; i < ingredients.length; i++) {
        const element = ingredients[i];
        if (BinarySearchIdProducts(element.id) === -1) {
            temparr.push(element);
        }        
    }
    unscannedingredients = temparr;
    FilterRecommandations();
}
// filter the recommandations of an ingredient based on a query for making a product
function FilterRecommandations(query) {
    document.getElementById("product-recommendations").innerHTML = "";
    if(!query){
        for (let i = 0; i < 10; i++) {
            const element = unscannedingredients[i];
            Create_Card_Ingredient(element, i , "product-recommendations");
        }
    }
    else{
        for (let i = 0; i < unscannedingredients.length; i++) {
            const element = unscannedingredients[i];
            if(element.name.includes(query)){
                Create_Card_Ingredient(element, i , "product-recommendations");
            }
        }
    }
}
// fills the ingredient id in the input field
function FillIdingredient(x){
    const displayingredientid = document.getElementById("ingredientidinput");
    displayingredientid.value = unscannedingredients[x].id;
}

document.getElementById("productSearchInput")
.addEventListener("keypress", (event) => {
    document.getElementById("productSearchInput").value = event.target.value;
    FilterRecommandations(event.target.value);
});
// Makes a new product when everything is fine else give error
function createNewProduct() {
    let resonpsearrerror = [false, false, false, false, false];
    const unitprice = + document.getElementById("unitPriceInput").value;
    const quantity = + document.getElementById("quantityInput").value;
    const weight = + document.getElementById("weightKgInput").value;
    const barcode = document.getElementById("productBarcodeInput").value;
    const ingredientid = + document.getElementById("ingredientidinput").value;
    //everything is empty.
    if(quantity < 1 && weight < 1 && unitprice < 1 && barcode == "" && ingredientid == "")
    {
        resonpsearrerror = true;
    }
    // quantity and weight cannot both be negative because an item can be an amount like 6 eggs or a weight like 1 kg.
    if(quantity < 1 && weight < 1){
        resonpsearrerror[1] = true;
        resonpsearrerror[2] = true;
    }
    if(barcode == ""){
        resonpsearrerror[3] = true;
    }
    if(unitprice < 1){
        resonpsearrerror[0] = true;
    }
    const hasId = products.some(ingredient => ingredient.IngredientId === ingredientid);
    if(ingredientid < 1 || hasId == true){
        resonpsearrerror[4] = true;
    }
    MakeErrorMakeProduct(resonpsearrerror);
    if(resonpsearrerror.includes(true) != true){
        products.push({
            "IngredientId": ingredientid,
            "Barcode": barcode,
            "UnitPrice": unitprice,
            "Quantity": quantity,
            "QuantityWeightKg": weight
        });
        const orderdedproducts = products.sort((a, b) => a.IngredientId - b.IngredientId);
        products = orderdedproducts;
        FilterUnscannedIngredients();
        Create_Cards();
    }
}
// Shows the error when creating a product when needed
function MakeErrorMakeProduct(x){
    const errordiv = document.getElementById("Alert-Made-Products");
    errordiv.innerHTML = "";
    if(x[0]  == false && x[1]  == false && x[2] == false && x[3] == false && x[4] == false){
        errordiv.style.display = "none";
    } else{
        errordiv.style.display = "block";
    }
    if(x === true){
        errordiv.innerHTML = `everything is empty.`;
    }
    if(x[1] == true && x[2] == true){
        errordiv.innerHTML = `weight and quantity cannot both be empty because an item can be an amount like 6 eggs or a weight like 1 kg.`;
    }
    if(x[3] == true){
        errordiv.innerHTML += `barcode cannot be empty because a product can have an unique barcode.`;
    }
    if(x[0] == true){
        errordiv.innerHTML += `unit price cannot be empty.`;
    }
    if(x[4] == true){
        errordiv.innerHTML += `ingredient id cannot be empty because an ingredient has a unique id, or there is already an product with that id.`;
    }
}
// Creates the detail 
function ProductDetail(i) {
    const DetailModal = new bootstrap.Modal(document.getElementById("UpdateProductModal"));
    DetailModal.show();
    let buttondelete = document.getElementById('DeleteProduct');
    let buttonupdate = document.getElementById('UpdateProduct');
    let unitprice = document.getElementById(`unitPriceUpdate`);
    let quantity = document.getElementById(`quantityUpdate`);
    let weight = document.getElementById(`weightKgUpdate`);
    let barcode = document.getElementById(`productBarcodeUpdate`);
    unitprice.value = products[i].UnitPrice;
    quantity.value = products[i].Quantity;
    weight.value = products[i].QuantityWeightKg;
    barcode.value = products[i].Barcode;
    buttondelete.onclick = function() {
        DeleteProduct(i);
    }; 
    buttonupdate.onclick  = function() {
        products[i].UnitPrice = + unitprice.value;
        products[i].Quantity = + quantity.value;
        products[i].QuantityWeightKg = + weight.value;
        products[i].Barcode = barcode.value;
        if (DetailModal) {
            DetailModal.hide(); // Hides only if modal exists and is currently open
        }   
        Create_Cards(); 
    };
}
// Removes a product from the product array
function DeleteProduct(i) {
    products.splice(i, 1);
    const DetailModal = bootstrap.Modal.getInstance(document.getElementById("UpdateProductModal"));
    if (DetailModal) {
        DetailModal.hide();
    }   
    Create_Cards(); 
}
function toggleInfo() {
    const info = document.querySelector(".info");
    info.classList.toggle("show");
}

function toggleInfoOn() {
    const info = document.querySelector(".info");
    const on = info.classList.contains("show");
    if (!on) {
        info.classList.toggle("show");
    }
}


function toggleInfoOf() {
    const info = document.querySelector(".info");
    const on = info.classList.contains("show");
    if(on){
        info.classList.toggle("show");
    }
}

async function getRenderUrl(string) {
    const data = await fetch(string);
    const html = await data.text();
    document.querySelector(".info").innerHTML = html;
    toggleInfoOn();
}

async function getRenderIngredient(naam) {
    const response = await fetch(`/storage/edit?name=${encodeURIComponent(naam)}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json'
        }
    });
    const text = await response.text();
    document.querySelector(".info").innerHTML = text;
    toggleInfoOn();
}

async function getRenderIngredientBar() {
    const response = await fetch(`/storage/editbar`, {
        method: "GET",
        headers: {
            'Accept': 'application/json'
        }
    });
    const text = await response.text();
    document.querySelector(".info").innerHTML = text;
    toggleInfoOn();
}

async function getfiltered() {
    const query = document.getElementById("search").value;
    const gridcontainer = document.getElementById("gridContainer");
    if(query != ""){
    const data = await fetch(`/storage/filter/${query}`);
    const html = await data.text();
    gridcontainer.innerHTML = html;
    } else if(gridcontainer.innerHTML == ""){
        location.reload();
    }
}

async function handleBarcodeSubmit(event) {
    event.preventDefault();
    const barcodeInput = document.getElementById('barcodeInput');
    const barcode = barcodeInput.value;
    
    const response = await fetch('/storage/editbar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: `barcode=${encodeURIComponent(barcode)}`
    });
    
    const text = await response.text();
    document.querySelector(".info").innerHTML = text;
    toggleInfoOn();
}
const Floor = [];
let options;
const fillmodal = document.querySelector("#fillmodal");
class table{
    constructor(amount, follownumber){
        this.follownumber = follownumber;
        this.stools = [];
        this.Generate(amount);
        this.Area = undefined;
    }
    Generate(amount){
        this.stools = [];
        for (let index = 0; index < amount; index++) {
            const tempstool = new stool(index);
            this.stools.unshift(tempstool);
        }
    }
    tostring(){
        return {follownummer : this.follownumber, amount : this.stools.length, area : this.Area};
  }
}
class stool {
  constructor(follownumber) {
    this.list = [];
    this.nummer = follownumber;
  }
  Addtolist(item) {
    this.list.unshift(item);
  }
}
//generates a table based on the input
function Generate_Table(aantal, volgnummer, areanummer) {
  if (
    aantal != undefined &&
    volgnummer != undefined &&
    Check_Follow_Nummer(volgnummer) != true
  ) {
    const temptable = new table(aantal, volgnummer);
    if (areanummer != undefined) {
      temptable.Area = areanummer;
    }
    Floor.push(temptable);
    return true;
  } else {
    return false;
  }
}
//generates json
function Genereate_Json() {
  let Json_Array = [];
  Floor.forEach((element) => {
    Json_Array.push(element.tostring());
  });
  return JSON.stringify(Json_Array);
}
//when new table is made generate the html, only latest table
function Generate_html() {
  const show = document.getElementById("showtables");
  const element = Floor[Floor.length - 1];
  show.innerHTML += `<button class="table" data-bs-toggle="modal" data-bs-target="#modalfill" onclick="fillmodalfunction(${
    Floor.length - 1
  })">Table ${element.follownumber}</button>`;
}
//does the same as Generate_html but for the whole floor.
function Generate_all_html() {
  const show = document.getElementById("showtables");
  const optionsmodalmake = document.getElementById("Create-Table-Multi");
  show.innerHTML = "";
  show.innerHTML += `<button type="button" class="table" data-bs-toggle="modal" data-bs-target="#tablemodle">+</button>`;
  for (let i = 0; i < Floor.length; i++) {
    const element = Floor[i];
    show.innerHTML += `<button class="table" data-bs-toggle="modal" data-bs-target="#modalfill" onclick="fillmodalfunction(${i})">Table ${element.follownumber}</button>`;
  }
  optionsmodalmake.innerHTML = options;
}
function fillmodalfunction(index) {
  const element = Floor[index];
  fillmodal.innerHTML = "";
  fillmodal.innerHTML += ` <p class="card-text">Number of chairs: ${element.stools.length}</p>
    <div class="input-group mb-3">
      <div class="form-floating">
        <input type="number" class="form-control amountstoolsupdate" id="table${index}" placeholder="How many chairs">
        <label for="table${index}">How many chairs</label>
      </div>
    </div>
    <div class="form-floating">
      <select class="form-select" id="floatingSelectGrid">
            ${options}
      </select>
      <label for="floatingSelectGrid">Works with selects</label>
    </div>
    <br>
    <button onclick="Update_Table(${index})" class="btn btn-primary">Update table</button>
    <br><br>
    <button onclick="Delete_Table(${index})" class="btn btn-danger">Delete table</button>
  </div>`;
}
async function Create_Options() {
  const data = await Fetch_Json_File("../tempdata/sections.json");
  if (data != undefined) {
    let string = "";
    data.forEach((element) => {
      string += `<option value="${element.value}">${element.string}</option>`;
    });
    options = string;
  } else {
    options = `<option value="undefined">undefined</option>`;
  }
}
Create_Options();
function CloseModalMakeTable() {
  // const modalElement = document.getElementById("tablemodle");
  // const modalInstance = bootstrap.Modal.getInstance(modalElement);
  // if (modalInstance) {
  //     modalInstance.hide();
  // }
}
function Close_Modal_Edit() {
  // const modalElement = document.getElementById("modalfill");
  // const modalInstance = bootstrap.Modal.getInstance(modalElement);
  // if (modalInstance) {
  //     modalInstance.hide();
  // }
}
// Updates the amount of chairs is at the table.
function Update_Table(index) {
  const amountofnewstools = document.getElementById(`table${index}`).value;
  const sectionofnewtable = document.getElementById("floatingSelectGrid").value;
  Floor[index].Generate(amountofnewstools);
  Floor[index].Area = sectionofnewtable;
  Generate_all_html();
  Close_Modal_Edit();
}
//removes a table from the floor. uses splice so that either table could be deleted
function Delete_Table(i) {
  Floor.splice(i, 1);
  Close_Modal_Edit();
  Generate_all_html();
}
// checks follow number for no doubles
function Check_Follow_Nummer(numberin) {
  let found = false;
  Floor.forEach((element) => {
    if (element.follownumber == numberin) {
      found = true;
    }
  });
  return found;
}

// function dat is being used by a button on the html page to create a table
function Button_Table_Create_Clicked() {
    const Follow_Nummer_Stool = document.getElementById("follownummer");
    const sectionofnewtable = document.getElementById("Create-Table-Multi").value;
    const amountstool = document.getElementById("amountstools");
    if (Follow_Nummer_Stool.value !== '' && amountstool.value !== '' && amountstool.value >= 1) {
        if (Generate_Table(amountstool.value, Follow_Nummer_Stool.value, sectionofnewtable) === false) {
            alert("There already is a table with that follow number");
        }
        else{
            Generate_html();
            CloseModalMakeTable();
        }
    }
  }
//if the download button is pushed file is downloaded
function Download_Json_Floor() {
  if (Floor.length != 0) {
    Create_Json_File("groundfloor", Genereate_Json());
  }
}
//check if the page has data or not. if so fill the page with the right html
async function Start_Page() {
  const data = await Fetch_Json_File("../tempdata/groundfloor.json");
  if (data != undefined) {
    data.forEach((element) => {
      Generate_Table(element.amount, element.follownummer, element.Area);
    });
    Generate_all_html();
  }
}
Start_Page();
Show_Warning_When_Leaving();

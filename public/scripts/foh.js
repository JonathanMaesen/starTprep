import * as general from "./general.js";

const floorSection = document.getElementById("floor");
const sortButtonDESC = document.getElementById("sortFloorDESC");
const sortButtonASC = document.getElementById("sortFloorASC");
const sortButtonInside = document.getElementById("sortFloorInside");
const sortButtonOutside = document.getElementById("sortFloorOutside");

sortButtonDESC.addEventListener("click", StoolCountDESC);
sortButtonASC.addEventListener("click", StoolCountASC);
sortButtonInside.addEventListener("click", sortTablesInside);
sortButtonOutside.addEventListener("click", sortTablesOutside);

let floor = [];

class Table {
  constructor(amount, follownumber, area) {
    this.follownumber = follownumber;
    this.stools = [];
    this.Generate(amount);
    this.Area = area;
    if (this.Area === "1") {
      this.isInside = true;
    } else if (this.Area === "2") {
      this.isInside = false;
    }
  }

  Generate(amount) {
    this.stools = [];
    for (let index = 0; index < amount; index++) {
      const tempstool = new Stool(index);
      this.stools.unshift(tempstool);
    }
  }

  tostring() {
    return {
      follownummer: this.follownumber,
      amount: this.stools.length,
      area: this.Area,
      isInside: this.isInside,
    };
  }
}

class Stool {
  constructor(follownumber) {
    this.list = [];
    this.nummer = follownumber;
  }

  Addtolist(item) {
    this.list.unshift(item);
  }
}

async function fetchFloorData() {
  const data = await general.Fetch_Json_File("../tempdata/groundfloor.json");
  if (data != undefined) {
    floor = data.map(
      (element) => new Table(element.amount, element.follownummer, element.Area)
    );
    renderFloor(floor);
  }
}

fetchFloorData();

function StoolCountDESC() {
  let sortedFloor = floor.sort(function (a, b) {
    return b.stools.length - a.stools.length;
  });
  renderFloor(sortedFloor);
}

function StoolCountASC() {
  let sortedFloor = floor.sort(function (a, b) {
    return a.stools.length - b.stools.length;
  });
  renderFloor(sortedFloor);
}

function sortTablesInside() {
  let sortedFloor = floor.filter((table) => table.isInside);
  renderFloor(sortedFloor);
}

function sortTablesOutside() {
  let sortedFloor = floor.filter((table) => !table.isInside);
  renderFloor(sortedFloor);
}

function redirectToMenu(follownummer, amount) {
  window.location.href = `frontOfHouseMenu.html?follownummer=${follownummer}&amount=${amount}`;
}

function renderFloor(floorelement) {
  floorSection.innerHTML = "";
  let counter = 0;
  floorelement.forEach((tableObj) => {
    const tableDiv = document.createElement("button");
    const tableInfo = tableObj.tostring();
    tableDiv.className = `table`;
    tableDiv.id = `${counter}`;
    tableDiv.innerHTML = `<h2> ${tableInfo.follownummer}</h2>`;

    tableDiv.addEventListener("click", () =>
      redirectToMenu(tableInfo.follownummer, tableInfo.amount)
    );

    floorSection.appendChild(tableDiv);

    counter++;
  });
}

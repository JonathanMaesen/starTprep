const Floor = [];
class table {
  constructor(amount, follownumber) {
    this.follownumber = follownumber;
    this.stools = [];
    this.Generate(amount);
  }
  Generate(amount) {
    for (let index = 0; index < amount; index++) {
      const tempstool = new stool(index);
      this.stools.unshift(tempstool);
    }
  }
  tostring() {
    return { follownummer: this.follownumber, amount: this.stools.length };
  }
}
class table{
    constructor(amount, follownumber){
        this.follownumber = follownumber;
        this.stools = [];
        this.Generate(amount);
    }
    Generate(amount){
        this.stools = [];
        for (let index = 0; index < amount; index++) {
            const tempstool = new stool(index);
            this.stools.unshift(tempstool);
        }
    }
    tostring(){
        return {follownummer : this.follownumber, amount : this.stools.length};
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
class stool{
    constructor(follownumber){
        this.list = [];
        this.nummer = follownumber;
    }
    Addtolist(item){
        this.list.unshift(item);
    }
    Remove_From_List(idin) {
        const index = this.list.findIndex(item => item === idin);
        if (index !== -1) {
          this.list.splice(index, 1);
        }
      }
      Remove_From_List_All(idin) {
        this.list = this.list.filter(item => item !== idin);
      }
}
//generates a table based on the input
function Generate_Table(aantal, volgnummer) {
  if (
    aantal != undefined &&
    volgnummer != undefined &&
    Check_Follow_Nummer(volgnummer) != true
  ) {
    const temptable = new table(aantal, volgnummer);
    Floor.push(temptable);
    return true;
  } else {
    return false;
  }
}
//gets activated at the start of the page.
async function Start_Page() {
  const data = await Fetch_Json_File("./tempdata/groundfloor.json");
  if (data != undefined) {
    Create_Floor_From_Json(await data);
  } else {
    alert("json file is missing");
    window.location.replace("http://127.0.0.1:5500/makefloor.html");
  }
}
//Generates a floor based on the the json file.
function Create_Floor_From_Json(jsonin) {
  jsonin.forEach((element) => {
    Generate_table(element.amount, element.follownummer);
    function Generate_table(amount, follownummer) {
      const temptable = new table(amount, follownummer);
      Floor.push(temptable);
    }
  });
}

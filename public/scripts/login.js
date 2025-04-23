String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }


function Generate_Random_Session_String() {
    let Session_String = "";
    for (let i = 0; i < 8; i++) {
        let randomCharCode = Math.floor(Math.random() * (126 - 32 + 1)) + 32;
        Session_String += String.fromCharCode(randomCharCode);
    }
    return Session_String;
}
function Hash_Pasword(jsonin) {
    const Session_String = Generate_Random_Session_String(jsonin.password);
    console.log(Session_String);
    document.cookie = Session_String;
}
Fetch_Users_Session();
// Fetchusersunhashed();
async function Create_Session(idin) {
  session_data.push({userid : idin, token : Generate_Random_Session_String(), Ip : await `${ip}`.hashCode()});
  document.cookie = session_data[session_data.length - 1].token;
  Create_Json_File("session", JSON.stringify(session_data));
}
function Check_Password() {
  let params = new URLSearchParams(document.location.search);
  let link = params.get("u");
  const Input_Username = document.getElementById("User_Name_Log_In").value;
  const Input_Password = document.getElementById("User_Password_Log_In").value.hashCode();
  User_Data.forEach(element => {
    if(element.Name === Input_Username && Input_Password === element.password){
      console.log("user found");
      Create_Session(User_Data.length);
      if(link != "back"){
        window.location.replace("http://localhost:5500/frontOfHouse.html");
      }
      else {
        window.location.replace("http://localhost:5500/home.html");
      }
    } else {
      console.log(Input_Password, Input_Username);
    }
  });
}
Fetch_All_Data();
// console.log("Damm)".hashCode());
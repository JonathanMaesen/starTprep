// file to be included in every page of the site, dont repeat code just put it here and include this script on each page you want that function to work on.
// like for example the nav or the footer etc...
// could also be used to read the cookie or sessie to see if the user has logged in or not and what level of acces it has.
function Show_Warning_When_Leaving() {
  window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
      e.returnValue = "Sure?";
    }

    // For Safari
    return "Sure?";
  };
}
function Create_Json_File(name, jsonin) {
  const a = document.createElement("a");
  const file = new Blob([jsonin], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = `${name}.json`;
  a.click();
}
async function Fetch_Json_File(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
// auth
let session_data;
let User_Data;
const cookie = document.cookie;
let User_Role;
const ip = Fetch_Ip();

async function Check_Cookie() {
  if(cookie != ''){
    let found = false;
    for (let i = 0; i < session_data.length; i++) {
      const element = session_data[i];
      if(element.token === cookie){
        found = true;
      }
    }
    if(found != true){
      console.log("token is wrong");
      window.location.replace('http://127.0.0.1:5500/login.html');
    } else {
      console.log("token is correct");
      Set_User_Role();
    }
}
else{
  console.log("cookie is not found");
  window.location.replace('http://127.0.0.1:5500/login.html');
}
}
async function  Check_Cookie_Safe(){
  if (!session_data) {
      await Fetch_Users_Session(); // Ensures session_data is available before checking
  }
  Check_Cookie();
}
async function Fetch_All_Data() {
  await Fetch_Users();
  await Fetch_Users_Session();
}
async function Fetch_Users() {
  const data = await Fetch_Json_File('../tempdata/users.json');
  User_Data = data;
}
async function Fetch_Users_Session(){
  session_data = await Fetch_Json_File('../tempdata/session.json');
}
async function Fetch_Ip() {
  const data = await Fetch_Json_File('https://ipinfo.io/json');
  const ip = await data.ip;
  return ip;
}
function Set_User_Role(){
  session_data.forEach(x => {
    if(x.token === cookie)
      {
        const User_Id = x.userid;
        User_Data.forEach(y => {
          if(y.id === User_Id){
            User_Role = y.role;
          }
        });
      }
  });
}
function Generate_Random_Session_String() {
    let Session_String = "";
    for (let i = 0; i < 8; i++) {
        let randomCharCode = Math.floor(Math.random() * (126 - 32 + 1)) + 32;
        Session_String += String.fromCharCode(randomCharCode);
    }
    return Session_String;
}
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
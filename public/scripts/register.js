function Check_Password_Input() {
    const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    const specialCharacters = [..."!@#$%^&*()_+-=[]{}|;:'\",.<>?/~`"];
  
    const New_User_Password = document.getElementById("passwordinput").value;
  
    let hasLetter = false;
    let hasSpecialChar = false;
    for (let i = 0; i < New_User_Password.length; i++) {
      const element = New_User_Password[i];
  
      if (alphabet.includes(element)) {
        hasLetter = true;
      }
      if (specialCharacters.includes(element)) {
        hasSpecialChar = true;
      }
  
      // If both conditions are met, exit early
      if (hasLetter && hasSpecialChar) {
        break;
      }
    }
  
    if (hasLetter && hasSpecialChar && New_User_Password.length >= 5) {
      // alert("Password is strong!");
      return true;
    } else {
      // alert("Password must contain at least one capital letter and one special character!");
    //   Show_Error_Password(hasLetter, hasSpecialChar);
      return false;
    }
  }
  
//   document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("passwordinput").addEventListener("input", Check_Password_Input);
//   });
  
  function Show_Error_Password(Capital, Special_Char){
    const nofi = document.querySelector(".notifpass");
    nofi.innerHTML = "";
    if(!Capital)
      {
        nofi.innerHTML += `<p class="Notification_Line_Error">Password does not contain any capital letters.</p>`;
      } else {
        nofi.innerHTML += `<p class="Notification_Line_Correct">Password does contain any capital letters.</p>`;
      }
    if(!Special_Char)
      {
        nofi.innerHTML += `<p class="Notification_Line_Error">Password does not contain any special letters.</p>`;
      } else {
        nofi.innerHTML += `<p class="Notification_Line_Correct">Password does contain any special letters.</p>`;
      }
  }
  
  function Create_Users() {
    const New_User_Name = document.getElementById("Nameinput").value;
    const New_User_Role = document.getElementById("roleinput").value;
    const New_User_Password_First = document.getElementById("passwordinput").value;
    const New_User_Password_Second = document.getElementById("passwordinputsecond").value;
    const Password_Result = Check_Password_Input();
    if (New_User_Name != '' && New_User_Password_First === New_User_Password_Second && New_User_Role != '' && Password_Result == true){
      User_Data.push({id : User_Data.length + 1, Name : New_User_Name, role: New_User_Role, password : New_User_Password_First.hashCode()});
      Create_Json_File("users", JSON.stringify(User_Data));
      window.location = "./home.html"
    }
    else{
      console.log("params are wrong");
    }
  }
  Fetch_All_Data();
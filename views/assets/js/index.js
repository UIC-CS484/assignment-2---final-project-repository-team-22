window.onload = function(){
  const username = document.getElementById("usernameText").innerHTML;
  const actionButton = document.getElementById("actionButton");
  if(!username){ //User isn't logged in:
    document.getElementById("welcomeText").style.visibility = "hidden";
    actionButton.href = "/register";
    actionButton.innerHTML = "Register"
  }
  else {
    document.getElementById("welcomeText").style.visibility = "visible";
    actionButton.href = "/logout";
    actionButton.innerHTML = "Logout"
  }
};

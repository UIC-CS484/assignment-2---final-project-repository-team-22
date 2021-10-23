window.onload = function(){
  const username = document.getElementById("usernameText").innerHTML;
  if(!username){ //User isn't logged in:
    document.getElementById("welcomeText").style.visibility = "hidden";
    document.getElementById("logoutButton").style.visibility = "hidden";
  }
  else {
    document.getElementById("registerButton").style.visibility = "hidden";
  }
};

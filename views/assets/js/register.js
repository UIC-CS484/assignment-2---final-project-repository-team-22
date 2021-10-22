function registerSubmit(){
  const form = document.registerForm;
  const password = registerForm.elements["password"].value;
  const c_password = registerForm.elements["c_password"].value;

  //Implementing strong passwords at both front and back end:
  if(!isPasswordStrong(password)){
    document.getElementById("error").innerHTML =
      "Password needs to have 8 or more characters, at least one alphabet and number";
  }
  else if(password!==c_password)
    document.getElementById("error").innerHTML = "Passwords do not match.";
  else{
    form.submit();
  }
}

function isPasswordStrong(password){
  if(password.length<8)
    return false;

  //Contains alphabet:
  const alphabetRegex = /[A-B|a-b]/;
  if(password.search(alphabetRegex)===-1)
    return false;

  //Contains number:
  const numberRegex = /[0-9]/;
  if(password.search(numberRegex)===-1)
    return false;

  return true;
}

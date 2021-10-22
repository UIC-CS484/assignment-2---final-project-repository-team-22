const crypto = require('crypto');

function hashPassword(password){
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return{
    salt: salt,
    hash: hash
  };
}

function isPasswordValid(inputPassword, existingHash, salt){
  const generatedHash = crypto.pbkdf2Sync(inputPassword, salt, 10000, 64, 'sha512').toString('hex');
  return existingHash === generatedHash;
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

module.exports.hashPassword = hashPassword;
module.exports.isPasswordValid = isPasswordValid;
module.exports.isPasswordStrong = isPasswordStrong;

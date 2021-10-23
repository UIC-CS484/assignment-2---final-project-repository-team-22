const express = require('express');
const existingUsersData = require('../users.json');
const fileSystem = require('fs');

function exists(fieldType, value){
  const users = existingUsersData.users;
  if(typeof users=='undefined')
    return false;
  switch(fieldType){
    case "username":
      for(user of users)
        if(user.username == value)
          return user;
      return false;
    case "userId":
      for(user of users)
        if(user.userId == value)
          return user;
      return false;
    case "email":
      for(user of users)
        if(user.email == value)
          return user;
      return false;
  }

  return false;
}

function addUser(user){
  //TODO Bad implementation but works until DB is implemented:
  if(typeof existingUsersData.users === 'undefined' ){
    existingUsersData.users = new Array(0);
  }
  existingUsersData.users.push(user);
  fileSystem.writeFileSync('users.json', JSON.stringify(existingUsersData));
}

module.exports.exists = exists;
module.exports.addUser = addUser;

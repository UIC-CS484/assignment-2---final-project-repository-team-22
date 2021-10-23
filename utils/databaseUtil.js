const express = require('express');
const existingUsersData = require('../users.json');
const fileSystem = require('fs');

function exists(fieldType, value){
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

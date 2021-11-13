const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const LOG_PREFIX = "databaseUtil.js:: ";

let db = new sqlite3.Database('./database/ExtinctOrAlive.sqlite', (err) =>{
  if(err){
    console.error(err.message);
    throw err;
  }
  else{
    console.log(LOG_PREFIX+"Connected to the SQLite database.");
  }
});

//Called whenever a query is fired to the DB:
db.on('trace', function (query){
  console.log("Executing query: "+query);
});

function exists(fieldType, value){

  console.log(LOG_PREFIX+"Checking-> "+fieldType+":"+value);

  //Preparing to fetch data from DB:
  let selectQuery = "";
  switch (fieldType) {
    case 'username':
      selectQuery = "SELECT * FROM user WHERE username = $value";
      break;
    case 'userId':
      selectQuery = "SELECT * FROM user WHERE user_id = $value";
    case 'email':
      selectQuery = "SELECT * FROM user WHERE email = $value";
    default:
      console.log(LOG_PREFIX+"Invalid field type");
      return "Error: Invalid field type";
  }
  const params = {1: fieldType, $value: value};

  const fetchCallback = (err, row)=>{
    if(err){
      console.log(LOG_PREFIX+"Error executing select query: "+err.message);
      return console.log(err.message);
    }
    if(typeof row !== 'undefined'){
      console.log(LOG_PREFIX+"Exists.");
      const user = {
        username:row.username,
        hash:row.password_hash,
        salt:row.salt,
        userId:row.userId,
        email:row.email
      };
      return user;
    }
    console.log(LOG_PREFIX+"Not found");
    return false;
  };

  //Fetching data from DB:
  db.get(selectQuery, params, fetchCallback);
}

function addUser(user){
  const addUser = 'INSERT INTO USER (user_id, username, email, password_hash,'+
                  'salt) VALUES (?,?,?,?,?);'
  const params = [user.userId, user.username, user.email, user.hash, user.salt];

  db.run(addUser, params, function(err){
    if(err)
      return console.log(err.message);
    console.log("User created");
    console.log(`Rows inserted ${this.changes}`);
  });
}

module.exports.exists = exists;
module.exports.addUser = addUser;

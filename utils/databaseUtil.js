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

let exists = (fieldType, value, successCallback, failureCallback) => {

  console.log(LOG_PREFIX+"Checking-> "+fieldType+":"+value);

  //Preparing to fetch data from DB:
  let selectQuery = "";
  switch (fieldType) {
    case 'username':
      selectQuery = "SELECT * FROM user WHERE username = $value";
      break;
    case 'userId':
      selectQuery = "SELECT * FROM user WHERE user_id = $value";
      break;
    case 'email':
      selectQuery = "SELECT * FROM user WHERE email = $value";
      break;
    default:
      console.log(LOG_PREFIX+"Invalid field type");
      failureCallback("Error: Invalid field type");
      return;
  }
  const params = {1: fieldType, $value: value};

  const fetchCallback = (err, row)=>{
    if(err){
      console.log(LOG_PREFIX+"Error executing select query: "+err.message);
      failureCallback(console.log(err.message));
      return;
    }
    if(typeof row !== 'undefined'){
      console.log(LOG_PREFIX+"Exists.");
      const user = {
        username:row.username,
        hash:row.password_hash,
        salt:row.salt,
        userId:row.user_id,
        email:row.email
      };
      successCallback(user);
      return;
    }
    console.log(LOG_PREFIX+"Not found");
    successCallback(false);
    return;
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

function updateUser(fieldType, value, userId, successCallback, failureCallback){

  console.log("Trying to update "+fieldType+" of "+userId+" to "+value);

  let updateQuery = "";
  let parameters = "";
  switch (fieldType) {
    case 'username':
      updateQuery = "UPDATE user SET username = $value WHERE user_id = $userId ;";
      parameters = {
        $value: value,
        $userId: userId
      };
      break;
    case 'password':
      updateQuery = "UPDATE user SET password_hash = $hash , salt = $salt "+
                    "WHERE user_id = $userId ;";
      parameters = {
        $hash: value.hash,
        $salt: value.salt,
        $userId: userId
      };
      break;
    case 'email':
      updateQuery = "UPDATE user SET email = $value WHERE user_id = $userId ;";
      parameters = {
        $value: value,
        $userId: userId
      };
      break;
    default:
      console.log(LOG_PREFIX+"Invalid field type");
      failureCallback("Error: Invalid field type");
      return false;
  }

  db.run(updateQuery, parameters, (error)=>{
    if(error){
      console.log(LOG_PREFIX+"Error updating records: "+error);
      failureCallback(error);
      return false;
    }

    successCallback();
    return true;
  });
}

function deleteUser(userId, successCallback, failureCallback){
  console.log(LOG_PREFIX+"Trying to delete "+userId);

  //TODO: figure out what else to delete
  const deleteQuery = "delete from user where user_id = $userId";
  const parameters = {$userId: userId};

  db.run(deleteQuery, parameters, (error)=>{
    if(error){
      console.log(LOG_PREFIX+"Error delete account: "+error);
      failureCallback(error);
      return false;
    }

    successCallback();
    return true;
  });
}

function addSpecies(speciesDetails, successCallback, failureCallback){
  console.log(LOG_PREFIX+"Trying to add "+speciesDetails.scientific_name);
  const addQuery = "insert into species(species_id, scientific_name, status_code,"+
                   "status_year) values (?, ?, ?, ?);"
  const params = [null, speciesDetails.scientific_name, speciesDetails.status_code,
                  speciesDetails.status_year];

  db.run(addQuery, params, (error)=>{
    if(error){
      console.log(LOG_PREFIX+"Error occured while adding species: "+
                  speciesDetails.scientific_name);
      failureCallback(error);
      return false;
    }
    successCallback();
    return true;
  })
}

function updateSpecies(species_id, speciesDetails, callback){
  console.log(LOG_PREFIX+" trying to update "+species_id);

  if(typeof speciesDetails.name != 'undefined'){
    const updateQuery = "update species set name = ? where species_id = ?";
    const parameters = [speciesDetails.name, species_id];
    db.run(updateQuery, parameters, (error)=>{
      if(error){
        callback(error);
        return false;
      }
    });
  }

  if(typeof speciesDetails.scientific_name != 'undefined'){
    const updateQuery = "update species set scientific_name = ? where species_id = ?";
    const parameters = [speciesDetails.scientific_name, species_id];
    db.run(updateQuery, parameters, (error)=>{
      if(error){
        callback(error);
        return false;
      }
    });
  }

  if(typeof speciesDetails.status_code != 'undefined'){
    const updateQuery = "update species set status_code = ? where species_id = ?";
    const parameters = [speciesDetails.status_code, species_id];
    db.run(updateQuery, parameters, (error)=>{
      if(error){
        callback(error);
        return false;
      }
    });
  }

  if(typeof speciesDetails.status_year != 'undefined'){
    const updateQuery = "update species set status_year = ? where species_id = ?";
    const parameters = [speciesDetails.status_year, species_id];
    db.run(updateQuery, parameters, (error)=>{
      if(error){
        callback(error);
        return false;
      }
    });
  }

  if(typeof speciesDetails.population != 'undefined'){
    const updateQuery = "update species set population = ? where species_id = ?";
    const parameters = [speciesDetails.population, species_id];
    db.run(updateQuery, parameters, (error)=>{
      if(error){
        callback(error);
        return false;
      }
    });
  }

  if(typeof speciesDetails.region != 'undefined'){
    const updateQuery = "update species set region = ? where species_id = ?";
    const parameters = [speciesDetails.region, species_id];
    db.run(updateQuery, parameters, (error)=>{
      if(error){
        callback(error);
        return false;
      }
    });
  }

  if(typeof speciesDetails.image_url != 'undefined'){
    const updateQuery = "update species set image_url = ? where species_id = ?";
    const parameters = [speciesDetails.image_url, species_id];
    db.run(updateQuery, parameters, (error)=>{
      if(error){
        callback(error);
        return false;
      }
    });
  }

  if(typeof speciesDetails.description != 'undefined'){
    const updateQuery = "update species set description = ? where species_id = ?";
    const parameters = [speciesDetails.description, species_id];
    db.run(updateQuery, parameters, (error)=>{
      if(error){
        callback(error);
        return false;
      }
    });
  }

  callback();
  return true;
}

module.exports.db = db;
module.exports.exists = exists;
module.exports.addUser = addUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.addSpecies = addSpecies;
module.exports.updateSpecies = updateSpecies;

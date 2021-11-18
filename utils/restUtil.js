//Placeholder till IUCN API token gets approved:
const extinctSpecies = require('../database/ExtinctSpecies.json');

const databaseUtil = require('./databaseUtil');
const axios = require('axios');

const GBIF_BASE = "https://api.gbif.org/v1/occurrence/";
const GBIF_PARAMS = "&limit=1";

function addSpeciesToDB(){

  //Extinct Species: (TODO: Get list from IUCN)
  for(let speciesName of extinctSpecies.result){
    let speciesDetails = {};
    speciesDetails.scientific_name = speciesName.scientific_name;
    speciesDetails.status_code='EX';

    databaseUtil.addSpecies(speciesDetails,
      function (){ //Success callback
        console.log(speciesDetails.scientific_name+" added succesfully.");
      },
      function (error){ //failureCallback
        console.log(error);
      }
    );
  }

  /* Fetching and inserting details about each species: */

  //Extinction Year: (TODO, use IUCN instead of GBIF)
  const getQuery = "select species_id, scientific_name from species where "+
                   "status_code='EX' and status_year is null;";

  databaseUtil.db.each(getQuery, function(error, row){
    let speciesDetails = {};
    speciesDetails.scientific_name = row.scientific_name;
    axios.get(GBIF_BASE+'search?scientific_name='+speciesDetails.scientific_name+
              GBIF_PARAMS)
      .then(function(response){
        speciesDetails.status_year = response.data.results[0].year;
        databaseUtil.updateSpecies(row.species_id, speciesDetails,
          function (error){ //Success Callback
            if(typeof error == 'undefined')
              console.log(row.species_id+ " updated succesfully.");
            else
              console.error(error);
          }
        );
      })
      .catch(function(error){
        console.error(error);
      });
  });

  //Counting number of extinct species per year:
  const yearQuery = "select status_year from species where status_code = 'EX' "+
                    "and status_year is not null";
  let years = {};
  databaseUtil.db.each(yearQuery,
    function(error, row){
      if(typeof years[row.status_year]=='undefined')
        years[row.status_year] = 1;
      else
        years[row.status_year]++;
    },
    function(){
      for(let year in years)
        console.log(year+"->"+years[year]);
    }
  );

  //Other details:
  /*
  const getQuery = "select species_id, scientific_name from species where "+
                   "name is null or region is null or image_url is null or "+
                   "description is null";
  */
}

module.exports.addSpeciesToDB = addSpeciesToDB;

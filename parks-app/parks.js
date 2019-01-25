/* eslint-disable no-console */
'use strict';
/* global $ */
// AAiy1c1UiI3L0f6vLtwCVz0U37nstlyd7aJq9XQl

//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=AAiy1c1UiI3L0f6vLtwCVz0U37nstlyd7aJq9XQl


const APIKEY = 'AAiy1c1UiI3L0f6vLtwCVz0U37nstlyd7aJq9XQl';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function apiCall (stateCode, q, maxResults=10) {
  const params = {
    key: APIKEY,
    q,
    stateCode,
    maxResults
  };

  let pKeys = Object.keys(params);

  let parksAPIURL = `${searchURL}?api_key=${params.key}&${pKeys[1]}=${params.q}&${pKeys[2]}=${params.stateCode}&${pKeys[3]}=${params.maxResults}`;
console.log(parksAPIURL);
  fetch(parksAPIURL)
    .then(response => response.json())
    .then(responseJSON => displayResults(responseJSON))
    .catch((err) => console.log(err));

  console.log('fetch ran');
}

function displayResults (array){
  console.log(array);
}


function generateHTML() {

}




function handleSubmit (){
  $('.js-search-controls').on('submit', function(event){
    event.preventDefault();
    console.log('submit detected');
    const stateCode = $('#search-state').val();
    const query = $('#search-city').val();
    const maxResults = $('#search-result').val();
    apiCall(stateCode, query, maxResults);
  });
console.log('ready to handle submits');
}

function handleParksSearch () {
  handleSubmit();
}

handleParksSearch();


 

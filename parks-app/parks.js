/* eslint-disable no-console */
'use strict';
/* global $ */
// AAiy1c1UiI3L0f6vLtwCVz0U37nstlyd7aJq9XQl

//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=AAiy1c1UiI3L0f6vLtwCVz0U37nstlyd7aJq9XQl


const APIKEY = 'AAiy1c1UiI3L0f6vLtwCVz0U37nstlyd7aJq9XQl';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function apiCall (stateCode, stateCode2, q, limit=10) {
  const params = {
    key: APIKEY,
    q,
    stateCode,
    stateCode2,
    limit
  };

  let pKeys = Object.keys(params);

  let parksAPIURL = `${searchURL}?api_key=${params.key}&${pKeys[1]}=${params.q}&${pKeys[2]}=${params.stateCode}&${params.stateCode2}&${pKeys[3]}=${params.limit}`;
  //   console.log(parksAPIURL);
  fetch(parksAPIURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error (response.statusText);
    })
    .then(responseJSON => {
      if (responseJSON.data.length === 0) {
        $('.results').html('No parks in this city/state');
      }
      else {
        displayResults(responseJSON);
      }})
    .catch((err) => console.log(err));

  console.log('fetch ran');
}

function displayResults (array){
  console.log(array);
  
  let html = generateString(array);
  $('.results').html(html);  
}


function generateString(array) {
  return array.data.map((item, index) => generateHTML(item)).join(' ');

// FULL NAME, DESCRIPTION, WEBSITE URL
  //FULL NAME
//   array.data[i].fullName
  //DESC
//   array.data[i].description
  // WEBSITE URL
//   array.data[i].url
}

function generateHTML (item) {
  return `
    <ul>
        <li>${item.fullName}</li>
        <li>${item.description}</li>
        <li>${item.url}</li>
    </ul>
    `;
}


function handleSubmit (){
  $('.js-search-controls').on('submit', function(event){
    event.preventDefault();
    console.log('submit detected');
    const stateCode = $('#search-state').val();
    const stateCode2 = $('#search-state-2').val();
    const query = $('#search-city').val();
    const limit = $('#search-result').val();
    apiCall(stateCode, stateCode2, query, limit);
  });
  console.log('ready to handle submits');
}

function handleParksSearch () {
  handleSubmit();
}

handleParksSearch();


 

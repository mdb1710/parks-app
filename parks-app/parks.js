/* eslint-disable no-console */
'use strict';
/* global $ */
// AAiy1c1UiI3L0f6vLtwCVz0U37nstlyd7aJq9XQl

//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=AAiy1c1UiI3L0f6vLtwCVz0U37nstlyd7aJq9XQl


const APIKEY = 'AAiy1c1UiI3L0f6vLtwCVz0U37nstlyd7aJq9XQl';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function apiCall (stateCode, q, limit=10) {
  const params = {
    'api_key': APIKEY,
    q,
    stateCode,
    limit,
    fields: 'addresses'
  };

  // let pKeys = Object.keys(params);

  // let parksAPIURL = `${searchURL}?api_key=${params.key}&${pKeys[1]}=${params.q}&${pKeys[2]}=${params.stateCode}&${pKeys[3]}=${params.limit}&${pKeys[4]}=${params.fields}`;
  
  let parksAPIURL = generateURI(params);
  
  console.log(parksAPIURL);
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

function generateURI (params) {
  let parameters = generateParameterString(params);
  let parksAPIURI = `${searchURL}?${parameters}`;
  return parksAPIURI;
}

function generateParameterString (params) {
  let pKeys = Object.keys(params);
  let stateCodes = formatStateCodes(params.stateCode);
  return pKeys.map((key) => (key !== 'stateCode')?`${key}=${params[key]}`: `${stateCodes}`).join('&');
}

function formatStateCodes(states) {
  return states.split(', ').map(state => `stateCode=${state}`).join('&');
}

// let parksAPIURL = `${searchURL}?${pKeys[0]}=${params.key}&${pKeys[1]}=${params.q}&${pKeys[2]}=${params.stateCode}&${pKeys[3]}=${params.limit}&${pKeys[4]}=${params.fields}`;

function displayResults (array){
  console.log(array);
  
  let html = generateString(array);
  $('.results').html(html);  
}


function generateString(array) {
  return array.data.map((item) => generateHTML(item)).join(' ');

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
      <li><h2>${item.fullName}</h2></li>
      <li>${item.addresses[0].line1}</li>
      <li>${item.addresses[0].line3}</li>
      <li>${item.addresses[0].city}, ${item.addresses[0].stateCode} ${item.addresses[0].postalCode}</li>
      <br>
      <li>${item.description}</li>
      <li><a href=${item.url}>${item.url}</a></li>
    </ul>
    <br>
    `;
}


function handleSubmit (){
  $('.js-search-controls').on('submit', function(event){
    event.preventDefault();
    console.log('submit detected');
    const stateCode = $('#search-state').val();
    const query = $('#search-city').val();
    const limit = $('#search-result').val();
    apiCall(stateCode, query, limit);
  });
  console.log('ready to handle submits');
}

//prepares the state text field input for the URI


function handleParksSearch () {
  handleSubmit();
}

handleParksSearch();
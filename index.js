'use strict';
/* global $ */
//://dog.ceo/api/breed/hound/images/random

function getDogImage(num) {
  fetch(`https://dog.ceo/api/breed/${num}/images/random`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(() => alert('Something went wrong. Try again later.',));
}


function displayResults(responseJson) {
  console.log(responseJson.message);
  //replace the existing image with the new one
  // $('.results-img').empty();

  let resultHTML = generateResultHTML(responseJson.message);
  // convert each item in our responseJSON.message into our HTML template
  // join the message array together into completed HTML
  // insert html onto page

  $('.js-results-display').html(resultHTML);

  // $('.results-img').replaceWith(
  //   `<img src="${responseJson.message[0]}" class="results-img">
      
  //     `
  // );
  
  //display the results section
  $('.results').removeClass('hidden');
}

/*function createHTMLString (array) {
  return array.map((item, index) => generateResultHTML(item)).join(' ');
}*/

function generateResultHTML (item) {
  // return image src item at itemIndex
  return `<img src="${item}" class="results-img">
    <br>`;
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let numDogs = $('.which-breed').val();
    getDogImage(numDogs);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
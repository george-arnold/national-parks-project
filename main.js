

'use strict';

// put your own value below!
const apiKey = 'IvD1ZsPNHIsVcHamshYRH3BLulfAXwK4HrQCdQsT'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
function displayResults(responseJson) {
  console.log(responseJson);
// The user must be able to make multiple searches and see only the results for the current search.
  $('#results-list').empty();

  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'> A link to ${responseJson.data[i].fullName} </a>
      </li>`
      
    )};

};

// The search must trigger a call to NPS's API.

function getParks(query, limit=10) {
  const params = {
    api_key: apiKey,
    // The user must be able to search for parks in one or more states.
    stateCode: query,
    limit
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#state').val();
    // The user must be able to set the max number of results, with a default of 10.
    const limit = $('#js-max-results').val();
    getParks(searchTerm, limit);
  });
}

$(watchForm);
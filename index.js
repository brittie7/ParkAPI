
'use strict'
const apiKey = 'QJfBOs2opfEhsBw5iNv8PFFBEbAIe3GfiUbwa6ia'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParks (query, maxResults=10){
  console.log('getParks ran');
    const params = {
      api_key: apiKey,
      stateCode: query,
      limit: maxResults
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

function displayResults(responseJson){
  console.log("hello world")
  console.log(responseJson);
  $('#results-list').empty();

  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].name}</a></h3><p>${responseJson.data[i].description}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
}


function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      console.log('WatchForm Ran')
      const searchTerm = $('#js-search-term').val();
      const maxResults = $('#js-max-results').val();
      console.log(searchTerm, maxResults);
      getParks(searchTerm, maxResults);
    });
  }
  
  $(watchForm);

  // https://api.github.com/users/brittie7/repos
  // just building something that adds
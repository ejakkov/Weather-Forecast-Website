
async function getForecastData(longitude, latitude) {
    const Http = new XMLHttpRequest();
    const url = 'http://www.7timer.info/bin/api.pl?lon=' + longitude + '&lat='+ latitude + '&product=civillight&output=json';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4 && Http.status === 200) {
            var response = Http.responseText;
            handleResponse(response); // callback
            return response;
        }
    }
}

// callback function to handle the response
function handleResponse(response) {

    numberOfDaysForForecast = 5;
    const weatherCardsDiv = document.getElementById('weatherCards');
    weatherCardsDiv.innerHTML = ''; // Clear existing cards
    var weatherForecast = JSON.parse(response).dataseries.slice(0,numberOfDaysForForecast);
    weatherForecast = includeDayNameInForecast(weatherForecast);
    // Loop through the data and create HTML elements to display it
    weatherForecast.forEach(data => {
        const cardElement = createCard(data);        
        weatherCardsDiv.appendChild(cardElement);
    });
    


}

// Function to create a card element for a data item
function createCard(data) {
    const card = document.createElement('div');
    card.classList.add('card'); // You can add CSS classes for styling here

    const temperatureClass = 'temperature';
    const dayClass = 'dayName';

    // Create and append elements for displaying data within the card
    const maxTemperatureElement = document.createElement('p');
    maxTemperatureElement.textContent = `Max temperature: ${data.temp2m.max}°C`;
    maxTemperatureElement.classList.add(temperatureClass);
    
    const minTemperatureElement = document.createElement('p');
    minTemperatureElement.textContent = `Min temperature: ${data.temp2m.min}°C`;
    minTemperatureElement.classList.add(temperatureClass);

    const dayName = document.createElement('p');
    dayName.textContent = data.dayName;
    dayName.classList.add(dayClass);

    // Append elements to the card
    card.appendChild(dayName);
    card.appendChild(maxTemperatureElement);
    card.appendChild(minTemperatureElement);
    
    return card;
}

function includeDayNameInForecast(arrayOfForecasts){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dateToday = new Date();
    var daynumber = dateToday.getDay()

    for(let i = 0; i<arrayOfForecasts.length; i++, daynumber++){
        if(daynumber>6) daynumber=0;
        arrayOfForecasts[i].dayName = days[daynumber];
    }
    return arrayOfForecasts;
}

async function displayCityNames(){
  textCSV = await readCSV();
  parsedData = parseCSV(textCSV);
  cityDropDownMenu(parsedData);

}

async function readCSV() {

    csvFilePath = 'city_coordinates.csv';
    
    try {
      const response = await fetch(csvFilePath);
      const text = await response.text();
      return text;
    } catch (error) {
      console.error(error);
    }
  }

  function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const results = [];
  
    for (let i = 1; i < lines.length; i++) {
      const data = lines[i].split(',');
      const entry = {};
  
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = data[j];
      }
  
      results.push(entry);
    }
    return results;

  }

function cityDropDownMenu(cityInfo){

  const cityMenuDiv = document.getElementById('city-dropdown-menu');
  const menu = document.createElement("select");
  cityMenuDiv.appendChild(menu);

  for(let i=0; i<cityInfo.length; i++){
    var option = document.createElement("option");

    option.text = cityInfo[i].city;
    menu.appendChild(option);
  }

}


async function choiceDropDownMenu(event) {
  

  var choiceValue = event.target.value;
  let textCSV = await readCSV();
  let parsedData = parseCSV(textCSV);

  for(let i=0; i<parsedData.length; i++){
    if(choiceValue == parsedData[i].city){
      var longitude = parsedData[i].longitude;
      var latitude = parsedData[i].latitude;
      break;
    }
  }
  getForecastData(longitude, latitude);
}

getForecastData();
displayCityNames();
document.getElementById('city-dropdown-menu').addEventListener('change', choiceDropDownMenu, true);
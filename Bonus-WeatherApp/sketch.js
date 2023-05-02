
// https://www.weather.gov/documentation/services-web-api#/default/radar_station
// https://api.weather.gov/gridpoints/OKX/34,37/forecast 

let place = 'Hoboken, New Jersey';
let url =   'https://api.weather.gov/gridpoints/OKX/34,37/forecast';

let forecast;

function preload() {
  // get the forecast from the 
  // National Weather Service in JSON format
  // https://p5js.org/reference/#/p5/loadJSON
  forecast = loadJSON(url);
  console.log(forecast);

  // note, by leaving off 'forecast' from the URL you can get
  // lots more data, which might be cool to include!
}

function setup() {
  // no canvas or draw!
  noCanvas();

  // first, let's add the location to the page...

  // we need to grab the 'wrapper' element so we can
  // add the location info to it
  let wrapper = document.getElementById('wrapper');
  
  // then we create a headline element with the
  // current location as the text!
  // challenge: try parsing the current conditions
  // and change the pushpin emoji to weather-related!
  let h1 = document.createElement('h1');
  h1.innerHTML = '&#128205; ' + place;
  wrapper.appendChild(h1);

  // while we're here, let's also change the title
  // of the page (so it shows up at the top and if
  // someone bookmarks the page)
  document.title = 'Weather for ' + place;

  // ok, let's grab some info from the forecast
  let today = forecast.properties.periods[0];
  console.log(today);

  // this has a lot of data inside it, so let's get
  // all that in a more useful format using a custom function
  today = parseForecast(forecast.properties.periods[0]);
  console.log(today);

  // now let's display the forecast in our page!
  // we could do this by...
  // 1. creating the elements in the index.html file, giving
  //    each one a unique ID and placing the data
  // 2. create the elements directly in Javascript, which
  //    is what we're going to do!
  // let's also do this in a function, to keep our code tidy
  listForecast(today);

  // ok that works!
  // let's load and display all the days available
  for (let i=1; i<forecast.properties.periods.length; i++) {
    let day = parseForecast(forecast.properties.periods[i]);
    listForecast(day);
  }

  // finally, let's also add a link to the NWS data we used
  // and a little byline, since we worked so hard on this
  // first, we create a paragraph element
  let byline = document.createElement('p');
  byline.id = 'byline';
  
  // then the link, which we add to the paragraph
  let link = document.createElement('a');
  link.innerHTML = 'Data provided by the National Weather Service';
  link.href = 'https://www.weather.gov/documentation/services-web-api#/default/radar_station';
  byline.appendChild(link);
  
  // finally, add a line break and the credit line, then
  // add the whole thing to our page
  byline.innerHTML += '<br>Built by Jeff Thompson'; 
  wrapper.appendChild(byline);
}

function parseForecast(f) {
  let out = {
    'name':             f.name,
    'highTemp':         f.temperature + '&deg; ' + f.temperatureUnit,
    'shortForecast':    f.shortForecast,
    'detailedForecast': f.detailedForecast
  };
  return out;
}

function listForecast(f) {
  // get the wrapper element again
  let wrapper = document.getElementById('wrapper');

  // for each day, create a 'div' or container for the
  // forecast info to go in (this will let us space stuff
  // out, add borders, etc later)
  let div = document.createElement('div');
  div.id = f.name;                // give it a unique ID so we can add items to it
  div.classList.add('forecast');  // add a class too, so we can style them all the same
  wrapper.appendChild(div);

  // now we can add some content to the div...

  // which day is this for?
  // create a headline element to show us
  let day = document.createElement('h2');

  // then add some text (and some HTML!) to the <h2>
  day.innerHTML = f.name + ' <span class="temp">' + f.highTemp + '</span>';

  // change the class, depending on if it's for the
  // day or night (which changes the bg color in the CSS)
  if (f.name.toLowerCase().includes('night')) {
    div.classList.add('night');
  }
  else {
    div.classList.add('day');
  }
  div.appendChild(day);

  // full forecast
  let full = document.createElement('p');
  full.classList.add('detailedForecast');
  full.innerHTML = f.detailedForecast;
  div.appendChild(full);
}



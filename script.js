document.body.innerHTML =`
<div class="container">
<h1 id="title" class="text-center">Rest Countries - API</h1> 
<div class="row" id="result"></div>
</div>
`
//fetching the data from api using fetch method
fetch("https://restcountries.com/v3.1/all").
then((res)=> res.json()).
then((data)=>{
    data.forEach((country)=>{
        console.log(country.name.official);
        console.log(country.flags.svg);
        console.log(country.capitalInfo.latlng[0]);
        displayCountries(country);  // function to display the countries data
    })
    
}).catch((err) => console.log(err));

function displayCountries(obj){
    result.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4">
        <div class = "card h-100">
            <div class = "card-header">
                <h4>${obj.name.official}</h4>
            </div>
            <img class="card-img-top" src=${obj.flags.svg} alt=${obj.name.official} />
            <div class="card-body">
                <div class="card-text">
                    <p>Capital: ${obj.capital}</p>
                    <p>Region: ${obj.region}</p>
                    <p>Country Code:${obj.cioc}</p>
                    <p>Latitude: ${obj.capitalInfo.latlng[0]}</p>
                    <p>Longitude: ${obj.capitalInfo.latlng[1]}</p>
                </div>
            <button 
            class="btn btn-primary"
            onclick="getWeatherData(${obj.capitalInfo.latlng[0]},${obj.capitalInfo.latlng[1]})"
            >
            Click for Weather
            </button>
            </div>
        </div>
    </div>
    `
}

// lat and lng from the above function is passed to the weather api to getWeatherData

function getWeatherData(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=6186ec1420626f0b608cb87838955f30`).
    then((res)=> res.json()).
    then((data) => {
        console.log(data);
        result.innerHTML = `
        <div class="card">
        <div class="card-header">
        <h3>Weather data</h3>
        </div>
        <p>Weather description: ${data.weather[0].description}</p>
        <p>Wind speed: ${data.wind.speed} </p>
        <p>Temperature: ${data.main.temp}</p>
        </div>
    
        `
    })
}
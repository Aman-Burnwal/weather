console.log("script ran")
const allow = document.querySelector(".allow");
const deny = document.querySelector(".deny");
const locations = document.querySelector("[grant-location]");
const completion = document.querySelector("#fuctionalties");
const defaultPage = document.querySelector("[default-page]");
const weatherShow = document.querySelector("[weather-show]");
const yourWeather = document.querySelector("[your-weather]");
const searchWeather = document.querySelector("[search-weather]");
const searchbar = document.querySelector("[search-bar]");
const windSpeed = document.querySelector("[wind-speed]");
const cloud = document.querySelector("[clouds]");
const humidity = document.querySelector("[humidity]");
const city = document.querySelector("[city-name]");
const weathercondition = document.querySelector("[weather-conditon]");
const temprature = document.querySelector("[temprature]");
const inputCity = document.querySelector("[input-city]");
const submitCity = document.querySelector("[submit-city]");








const apiKey = '82da8eb92c62419ba9055952242002';
const apiUrl = 'http://api.weatherapi.com/v1/current.json';
const weatheAPI = "1e51b07a069120f3b82301f2005b6c11";
const link = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";

let CityName = localStorage.getItem("currentLocation") ? localStorage.getItem("currentLocation") : "";


yourWeather.addEventListener("click", switchBtn)
searchWeather.addEventListener("click", switchBtn2)
locations.addEventListener("click", findlocation);
inputCity.addEventListener("input", verifyString); 
submitCity.addEventListener("click", findweatherByCity);


function findweatherByCity(e) {
    e.preventDefault();
    let city = inputCity.value;
    inputCity.value = "";
    
    if (!city) return;

    const responeUrl = `${apiUrl}?key=${apiKey}&q=${encodeURIComponent(city)}`;

    findWeather(responeUrl);
}


function verifyString() {

    var inputValue = inputCity.value;

    // Remove non-alphabetic characters using a regular expression
    var sanitizedValue = inputValue.replace(/[^a-zA-Z]/g, '');

    inputCity.value = sanitizedValue;

    
}

function switchBtn() {
    
    if (!yourWeather.classList.contains("bg-slate-400"))
        yourWeather.classList.add("bg-slate-400") 

    searchWeather.classList.remove("bg-slate-400");
    
    searchbar.classList.add("hidden");

    if (CityName) {

        const requestUrl =  `${apiUrl}?key=${apiKey}&q=${encodeURIComponent(CityName)}`;

        findWeather(requestUrl)
        defaultPage.classList.add("hidden");
        weatherShow.classList.remove("hidden");


    } 
    else {
        defaultPage.classList.remove("hidden");
        weatherShow.classList.add("hidden");
    }
}
switchBtn();

function switchBtn2() {
    if (!searchWeather.classList.contains("bg-slate-400")) {
        searchWeather.classList.add("bg-slate-400");
    }
    yourWeather.classList.remove("bg-slate-400");
    searchbar.classList.remove("hidden");
    defaultPage.classList.add("hidden");
    // console.log(defaultPage.classList)

    if (CityName) {
       
        weatherShow.classList.add("hidden");
        
        

    }

    
}




function findlocation () {
    
    navigator.geolocation.getCurrentPosition( function (position) {

        const [latitude, longitude] = [position.coords.latitude, position.coords.longitude];
     
        const apiUrlWithParams = `${apiUrl}?key=${apiKey}&q=${latitude},${longitude}`;

        fetch(apiUrlWithParams)
            .then(response => response.json())
            .then(data => {

                localStorage.setItem('currentLocation', data.location?.name);
                CityName = data.location?.name;               
                switchBtn();

               
            })
            .catch(error => {
               
                console.error('Error fetching weather data:', error);
            });
        
       
   
    }, function (error) {

        allow.classList.add("hidden");
        deny.classList.remove("hidden");
    })
}


 function findWeather(apiUrl) {
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            if (data.error) {
                alert(data.error.message)
                // console.alert(data.error.code)
                return;
            }
            weatherShow.classList.remove("hidden");
            city.textContent = data?.location?.name;
             weathercondition.textContent = data?.current?.condition?.text;
             
            temprature.innerHTML = ` ${data?.current?.temp_c} &deg;C`

            windSpeed.textContent = data?.current?.wind_kph + " ms/s";
            humidity.textContent = data?.current?.humidity + " %";

            cloud.textContent = data?.current?.pressure_in // wrong data 
            
            
        }) 
         .catch(err => {
            console.log(err)
        })
}
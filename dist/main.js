var apikey = '113db2a1990e94ec2a19f906191136fb';
var picskey = 'nnODgKzonIwDxjRNoZGNFXBA1h2fmE0y5NGQgPVQinVBY1uhny3TMKz5';
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        var searchString = document.getElementById('searchString').value;
        getWeather(searchString);
        document.getElementById('searchString').value = '';
    }
})
function getWeather(searchString){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=${apikey}&units=metric&lang=fr`
    ).then(response => {
        if(!response.ok){
            console.log('erreur');
            showError();
        } 
        return response.json()}).then(data  => {
        const cityName = data.name;
        const weather = data.weather[0];
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const temp = data.main.temp;
        const feels_like = data.main.feels_like;
        const min = data.main.temp_min;
        const max = data.main.temp_max;
        const wind_speed = data.wind.speed;
        
        displayWeather(description, icon, temp, feels_like, min, max, wind_speed, cityName);
        showBackground(searchString)
    })
}
function displayWeather(description, icon, temp, feels_like, min, max, wind_speed, cityName){
            const city = document.getElementById('city'); 
            const temperature = document.getElementById('temp');
            const ressenti = document.getElementById('ressenti');
            const wind = document.getElementById('wind');
            const desc = document.getElementById('desc');
            const minimum = document.getElementById('minimum');
            const maximum = document.getElementById('maximum');
          
            const weatherIcon = document.getElementById('weatherIcon');
            city.innerText = cityName;
           temperature.innerHTML =` <span class="text-6xl">${Math.round(temp)}<span>°`;
           ressenti.innerHTML = `ressenti:<span class="text-xl"> ${Math.round(feels_like)}<span>°`;
           desc.innerHTML = `<span class="text-2xl">${description}</span>`;
           minimum.innerHTML = `<span class="text-xl">${Math.round(min)}</span>° / <span class="text-xl">${Math.round(max)}</span>° `;
           wind.innerHTML = `<img src="./img/wind_speed.svg" class="w-16 h-32">  ${Math.round(wind_speed*1.85)} km/h`;
           weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`
}
function showBackground(searchString){
    var url = `https://api.unsplash.com/search/photos?page=1&query=${searchString}`
    document.body.style.backgroundImage = `<img src="${url}" />`    
    };

function showError(){
 let error = document.getElementById('error');
 error.classList.remove("opacity-0");
 stopError()
}
function stopError(){
let error = document.getElementById('error');
    setTimeout(() => {
        error.classList.add('opacity-0');
    },5000)
}
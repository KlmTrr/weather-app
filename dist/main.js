var apikey = '113db2a1990e94ec2a19f906191136fb';
var logo = 0;
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        var searchString = document.getElementById('searchInput').value;
        getWeather(searchString);
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
           temperature.innerHTML =` ${Math.round(temp)}°`;
           ressenti.innerHTML = `Ressenti:<pre> </pre> ${Math.round(feels_like)}°`;
           desc.innerHTML = `${description}`;
           minimum.innerHTML = `${Math.round(min)}° / ${Math.round(max)}° `;
           wind.innerHTML = `<img src="./img/wind_speed.svg" class=" w-16 h-32 md:w-32 md:h-64">  ${Math.round(wind_speed*1.85)} km/h`;
           weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@4x.png">`

           clothesIcons(feels_like)
           document.getElementById("display").style.opacity = "100";
}
function showBackground(searchString){
    var url = `https://api.unsplash.com/search/photos?page=1&query=${searchString}`
    document.body.style.backgroundImage = `<img src="${url}" />`    
    };
function clothesIcons(ressenti){
    let tenueHiver = ["t-shirt", "/", "shirt", "sweater", "coat", "pants" ]
    let tenueEte = ["t-shirt", "/", "shirt", "shorts" ]
    let tenuePrintemps = ["t-shirt", "/", "shirt", "jacket", "shorts",, "/", "pants" ]
    let tenuePrintemps2 = ["t-shirt", "/", "shirt", "sweater", "pants"]
    let tenueAutomne = ["t-shirt", "/", "shirt", "sweater", "jacket", "pants"]
    let tenues = []
    var habits = document.getElementsByClassName("habits")[0];
    habits.style.opacity = 0.9;
    
    if(ressenti< 15 && ressenti>9){
        tenues.push(tenueAutomne)
    }
    if(ressenti<10 ){
        tenues.push(tenueHiver)
    }
    if(ressenti >15 && ressenti < 25){
        tenues.push(tenuePrintemps, tenuePrintemps2)
    }
    if(ressenti> 20 ){
    tenues.push(tenueEte)
    }
    showClothes(tenues);
    
    
}
function showClothes(array){
    var habits = document.getElementsByClassName("habits")[0];
    habits.innerHTML = "";
    habits.style.opacity = 0.9;

  for(i = 0; i< array.length; i++){
    habits.innerHTML += `<div id='tenue${i}' class="tenue flex flex-1 h-1/3 lg:h-auto items-center wrap w-fit my-1 lg:mb-0"><span class="tenueTitle absolute lg:relative opacity-0 md:opacity-100"> Tenue ${i+1}</span></div>`
    array[i].forEach(clothe =>{
        if(clothe != "/"){
            document.getElementById(`tenue${i}`).innerHTML += `<img src="./img/${clothe}.png" class="clotheIcon w-14 md:w-20 mx-1"/>`
        }
        else{
        document.getElementById(`tenue${i}`).innerHTML += `<span class="separation">/</span>`;
        }
    })
  }
}
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
function deleteTitle(){
    document.getElementById("title").innerText = "";
}
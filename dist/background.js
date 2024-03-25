document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        var searchString = document.getElementById('searchInput').value;
        imgSearch(searchString);
        async function imgSearch(){
            const reponse = await fetch('https://api.pexels.com/v1/search?query=' + searchString +'&per_page=1&page=1',{
              headers: {
                Authorization: 'nnODgKzonIwDxjRNoZGNFXBA1h2fmE0y5NGQgPVQinVBY1uhny3TMKz5'
              }
            });
            const data = await reponse.json();
            const photo = data.photos[0];
            const color = data.photos[0].avg_color;
           const url = data.photos[0].src.original;
           const photographer = data.photos[0].photographer;
           const desc = data.photos[0].alt;
           const screen = document.getElementById('onescreen');
           screen.style.backgroundImage = `url(${url})`;
           screen.style.backgroundImage.alt = desc;
           screen.style.backgroundSize = "cover";
          
            changeColors(color);
           
            
           addPhotographer(photographer, desc);
            if(logo == 0){
              addPexelsLogo();
              logo = 1
            }
            
           }
        document.getElementById('searchInput').value = '';
    }
    function changeColors(color){
      var colors = [color.substring(1, 3), color.substring(3,5), color.substring(5,7)];
      var display = document.getElementById("display");
      var lightness = 0;
      colors.forEach(primary => {
       lightness += parseInt(primary, 16);
      });
      if(lightness < 382.5){
        display.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        display.style.color = "black";
        display.style.textShadow = "none";
      }
      else{
        display.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        display.style.color = "white";
        display.style.textShadow = "1px 0 #052a8f, -1px 0 #052a8f, 0 1px #052a8f, 0 -1px #052a8f, 1px 1px #052a8f, -1px -1px #052a8f, 1px -1px #052a8f, -1px 1px #052a8f;";
      }
    }
    function addPexelsLogo(){
     document.getElementById('logo').innerHTML += '<img src="./img/pexels.png">'
    }
    function addPhotographer(name){
      const photographe = document.getElementById('photographe');
      photographe.innerText = `Photographe: ${name}`;
    }
})

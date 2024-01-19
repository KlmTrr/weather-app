document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        var searchString = document.getElementById('searchString').value;
        imgSearch(searchString);
        async function imgSearch(){
            const reponse = await fetch('https://api.pexels.com/v1/search?query=' + searchString +'&per_page=1&page=1',{
              headers: {
                Authorization: 'nnODgKzonIwDxjRNoZGNFXBA1h2fmE0y5NGQgPVQinVBY1uhny3TMKz5'
              }
            });
            const data = await reponse.json();
            const photo = data.photos[0];
           const url = data.photos[0].src.original;
           const photographer = data.photos[0].photographer;
           const desc = data.photos[0].alt;
           const screen = document.getElementById('onescreen');
           screen.style.backgroundImage = `url(${url})`;
           screen.style.backgroundSize = "cover";
          
           addPhotographer(photographer, desc);
            if(logo == 0){
              addPexelsLogo();
              logo = 1
            }
            
           }
        document.getElementById('searchString').value = '';
    }
    function addPexelsLogo(){
     document.getElementById('logo').innerHTML += '<img src="./img/pexels.png">'
    }
    function addPhotographer(name, desc){
      const photographe = document.getElementById('photographe');
      photographe.innerText = `Photographe: ${name}`;
      const photodesc = document.getElementById('photoDesc');
      photodesc.innerText = desc;
    }
})

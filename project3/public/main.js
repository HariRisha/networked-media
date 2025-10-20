// This is used for the agreement page to check if the agreement box has been checked before the button can be pressed
window.onload = () => {
  let agreeCheck = document.getElementById('agreeCheck');
  let enterBtn   = document.getElementById('agree_btn');

  agreeCheck.addEventListener('change', () => {
    if (agreeCheck.checked) {
        enterBtn.classList.remove('disabled');
        enterBtn.disabled = false;
    } else {
        enterBtn.classList.add('disabled');
        enterBtn.disabled = true;
    }
  });
};

// Add constant for the panels and the adding marker
const panel = document.getElementById('dog_panel');
const add_dog_panel = document.getElementById('add_dog')
panel.style.display = 'none';
let canAddMarker = true;

// making a function to dynamically fill the view dog panel
function renderDogCard(d) {

  // build a list from the needs
  const needs = [];
  if (d.needs?.water) needs.push("Water");
  if (d.needs?.food) needs.push("Food");
  if (d.needs?.medical) needs.push("Medical care");

  // Show the information that was sent by the server
  panel.innerHTML = `
    <div class="dog-card">
      <h1>Dog info</h1>

      ${`<img src="${d.imgSrc}" alt="${d.text || "Dog"}" class="dog-photo" />`}

      <div class='text'> 
        <p id='fren_text'> The dog is ${d.friendliness}</p>
        <p id='needs_text'>The dog needs ${needs.join(", ")}</p>
        <p id='comment_text'>${d.text}</p>
      </div>
    </div>
  `;

  panel.style.display = "block";
}

// Map code as shown from the leaflet website
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Adding a custom dog marker
var dogIcon = L.icon({
  iconUrl: 'dog_marker.png',
  iconSize: [50, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

// Take the information from the array sent from the server and put those dogs on the map
dogsFromServer.forEach(dog => {
  const{ id, lat, lng, text, needs, friendliness} = dog;

  const marker = L.marker([lat, lng], {icon: dogIcon}).addTo(map);
  
  // Show the view dog card of each dog when clicked on them
  marker.on('click', () => {
    renderDogCard(dog);
  });
});


// Add new custom marker when map is right-clicked to the location of the click 
map.on('contextmenu', (e) => {
  panel.style.display = 'none';
  add_dog_panel.style.display = 'flex';

  if(canAddMarker){
    newMarker = L.marker(e.latlng, {icon: dogIcon }).addTo(map);
    // Send the lat and lng data to the invisible inputs in the add_dog panel
    document.getElementById('dog-lat').value = e.latlng.lat;
    document.getElementById('dog-lng').value = e.latlng.lng;
    canAddMarker = false;
  }

  // show the panel to the left when teh marker is clicked
  newMarker.on('click', ()=>{
    panel.style.display = 'block';
  })
});

// Remove the panels when clicked on the map and remove the dog marker if the user doesnt click submit before clicking on the map
map.on('click', (e) =>{
  panel.style.display = 'none';
  add_dog_panel.style.display = 'none';
  canAddMarker = true;
  map.removeLayer(newMarker);
})
const ipAddressText = document.querySelector('[data-ip]')
const locationText = document.querySelector('[data-location]')
const timeZoneText = document.querySelector('[data-timeZone]')
const ispText = document.querySelector('[data-isp]')
const inputText= document.querySelector('#ipv4')
const btnSubmit = document.querySelector('#submit')
let map = L.map('map');

let lat;
let lng;

const ipv4_address = $('#ipv4');

ipv4_address.inputmask({
    alias: "ip",
    greedy: false
});

async function getInfoIp(ipConfig){
  axios.get(`${ipConfig}`)
  .then(function (response) {
    const data = response.data
    lat = data.location.lat;
    lng = data.location.lng;
    changeInfo(data)
    displayMap()
  })
  .catch(function (error) {
  })
}

btnSubmit.addEventListener('click', (e)=>{
  e.preventDefault()
  getInfoIp(inputText.value)
})

const changeInfo = (info) => {
  ipAddressText.innerText = info.ip
  locationText.innerText = `${info.location.city}, ${info.location.region}`
  timeZoneText.innerText = info.location.timezone
  ispText.innerText = info.isp
}

const displayMap = () => {
  var markerIcon = L.icon({
      iconUrl: './assets/img/icon-location.svg',

      iconSize:     [46, 56], // size of the icon
      iconAnchor:   [23, 55], // point of the icon which will correspond to marker's location
  });
  map.setView([lat, lng], 17);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: false
  }).addTo(map);

  L.marker([lat, lng], {icon: markerIcon}).addTo(map)

};
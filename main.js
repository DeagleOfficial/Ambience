if (navigator.geolocation) {
    console.log(navigator.geolocation.getCurrentPosition(successFunc))
}
else {
    alert("Your Browser does not support GeoLocation")
}
var flag = false;
var search = document.getElementById('search')
var loc = document.getElementById('loc')
var temperature = document.getElementById('temp')
var icon = document.getElementById('icon')
var desc = document.getElementById('desc')

var api = 'https://api.openweathermap.org/data/2.5/weather?'
var key = '&APPID=11c8e92be9bd346ea62a9e154d1b617c&units=metric'

function getdata(event) {
    searchTerm = search.value
    fetch(api + "q=" + searchTerm + key)
    .then(w => {
        return w.json()
    })
    .then(update)
}

function update(w) {
    console.log(w)
    loc.innerHTML = w.name + ', ' + w.sys.country
    temperature.innerHTML = Math.round(w.main.temp) + ' ' + '\u00B0C'
    let str = w.weather[0].description
    icon.src = 'http://openweathermap.org/img/wn/' + w.weather[0].icon + '@2x.png'
    str = str[0].toUpperCase() + str.substr(1)
    desc.innerHTML = str
}

function successFunc(pos) {
    let lat = pos.coords.latitude
    let lon = pos.coords.longitude

    console.log(pos.coords.latitude)
    console.log(pos.coords.longitude)

    fetch(api + "lat=" + lat + "&lon=" + lon + key)
    .then(w => {
        return w.json()
    })
    .then(update)
}

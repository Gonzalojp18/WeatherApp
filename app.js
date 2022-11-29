let send = document.querySelector('#send');
let input = document.querySelector('.ciudad');
let degree = document.querySelector('#degree')
let temperatura = document.querySelector('#temp');
let container = document.querySelector('.container');
let boxError = document.querySelector('.weather');


send.addEventListener('click', function () {
    let ciudad = input.value;
    container.style.visibility = "visible"
    document.querySelector('#city').textContent = ciudad;

    if (ciudad === "") {
        error('Enter an avaible city')
        return
    }
    ConsultarApi(ciudad)
});

function error(mensaje) {
    container.style.visibility = "hidden"
    const alerta = document.createElement('div');
    alerta.classList.add('border', 'p-2', 'bg-danger', 'text-center', 'w-50', 'm-auto');
    alerta.innerHTML =
        `<p>Error!</p>
    <span>${mensaje}</span>`;

    boxError.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    }, 1000);
}

// Consulta de API
function ConsultarApi(ciudad) {
    const IdApp = "8aa3d74d9989c88e57dd7163f1d0a32b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${IdApp}`;

    fetch(url)
        .then((response) => response.json())
        .then((datos) => {
            if (datos.cod === "404") {
                error("Enter an avaible city");
                return;
            }
            showWeather(datos);
        });
}

function showWeather(datos) {
    const curreTemp = datos.main.temp;
    const centigrades = curreTemp - 274.15;
    let icon = datos.weather[0].icon;
    let iconRuta = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    document.getElementById('wicon').src = iconRuta;
    temp.textContent = Math.floor(centigrades);
    degree.innerHTML = '<sup>°C</sup>';

}



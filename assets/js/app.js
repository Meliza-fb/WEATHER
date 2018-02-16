buscar();
function buscar() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      postn = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Obtener datos para el día de hoy desde la API
      $.getJSON('https://api.darksky.net/forecast/017bde5b5868271771b080be907d6813/' + postn.lat + ',' + postn.lng + /* ',' + time +*/ '?extend=hourly&callback=?&units=auto&lang=es', function(forecast) {
        // console.log(forecast);
        var contenedor = $('.fore-container');
        var skiconsCurrent = forecast.currently.icovar;
        var title = $('<h1 class="title">').text('Pronostico');
        var temperature = $('<h2 class="temperature">').text(`${Math.floor(forecast.currently.temperature)}°`);// math.floor =Redondear un número a la baja a su entero más cercano:
        var windSpeed = $('<div class="extras">').html(`<p><span class="left-align">Viento</span> <span class="right-align">${forecast.currently.windSpeed}  m/s</span></p>`);
        var humidity = $('<div class="extras">').html(`<p><span class="left-align">Humedad</span> <span class="right-align">${forecast.currently.humidity}  %</span></p>`);
        var uvIndex = $('<div class="extras">').html(`<p><span class="left-align">Índice UV</span> <span class="right-align">${forecast.currently.uvIndex}</span></p>`);
        var pressure = $('<div class="extras">').html(`<p><span class="left-align">Presión</span> <span class="right-align">${forecast.currently.pressure}  hPa</span></p>`);
        var weekForecast = $('<a class="waves-effect waves-light btn">').text('Ver pronóstico');
        contenedor.append(title, temperature, windSpeed, humidity, uvIndex, pressure, weekForecast);

        weekForecast.on('click', function() {
          btnWeekFunction();
        });

        var currentDay = $('<button type="button" class="btn btn-style">').text('Atrás');
        currentDay.on('click', function() {
          btnDailyFunction();
        });
      });
    });
  }
}

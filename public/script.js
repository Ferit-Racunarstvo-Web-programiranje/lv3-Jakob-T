let sviVremenskiPodaci = [];
fetch('weather.csv')
    .then(res => res.text())
    .then(csv => {
        const rezultat = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true
        });

        const weatherData = rezultat.data.map(item => ({
            id: item.ID,
            temperature: Number(item.Temperature),
            humidity: Number(item.Humidity),
            windSpeed: Number(item["Wind Speed"]),
            precipitation: Number(item["Precipitation (%)"]),
            cloudCover: item["Cloud Cover"],
            pressure: Number(item["Atmospheric Pressure"]),
            uvIndex: Number(item["UV Index"]),
            season: item.Season,
            visibility: Number(item["Visibility (km)"]),
            location: item.Location,
            weatherType: item["Weather Type"]
        }));
/*
        weatherData.push({
            id: "W9999",
            temperature: 25,
            humidity: 60,
            windSpeed: 7.5,
            precipitation: 15.0,
            cloudCover: "clear",
            pressure: 1013,
            uvIndex: 7,
            season: "Spring",
            visibility: 9.0,
            location: "inland",
            weatherType: "Sunny"
        });*/
        console.log(weatherData);
        const prvih20_weather = weatherData.slice(0, 20);
        prikaziTablicu(prvih20_weather);
    })
    .catch(error => console.error("Greška pri učitavanju CSV-a:", error));

function prikaziTablicu(weatherData) {
    const tbody = document.querySelector("#weather-tablica tbody");
    tbody.innerHTML = ""; // Očisti prethodne redove

    for (const item of weatherData) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.temperature}</td>
            <td>${item.humidity}</td>
            <td>${item.windSpeed}/h</td>
            <td>${item.precipitation}</td>
            <td>${item.cloudCover}</td>
            <td>${item.pressure}</td>
            <td>${item.uvIndex}</td>
            <td>${item.season}</td>
            <td>${item.visibility}</td>
            <td>${item.location}</td>
            <td>${item.weatherType}</td>
        `;
        tbody.appendChild(row);
    }
}



function prikaziPocetneVremenskePodatke(podaci) {
    const tbody = document.querySelector('#weather-table tbody');
    tbody.innerHTML = '';
    for (const podatak of podaci) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${podatak.location}</td>
        <td>${podatak.season}</td>
        <td>${podatak.temperature}°C</td>
        <td>${podatak.weatherType}</td>
        <td>${podatak.date}</td>
      `;
      tbody.appendChild(row);
    }
}
function filtriraj() {
    const sezona = document.getElementById('filter-season').value.trim().toLowerCase();
    const lokacija = document.getElementById('filter-location').value.trim().toLowerCase();
    const temperatura = parseInt(document.getElementById('filter-temperature').value);
    const vrstaVremena = document.getElementById('filter-weather').value.trim().toLowerCase();
  
    const filtriraniPodaci = sviVremenskiPodaci.filter(podaci => {
      const sezonaMatch = !sezona || podaci.season.toLowerCase().includes(sezona);
      const lokacijaMatch = !lokacija || podaci.location.toLowerCase().includes(lokacija);
      const temperaturaMatch = podaci.temperature >= temperatura;
      const vrstaVremenaMatch = !vrstaVremena || podaci.weatherType.toLowerCase().includes(vrstaVremena);
  
      return sezonaMatch && lokacijaMatch && temperaturaMatch && vrstaVremenaMatch;
    });
  
    prikaziPocetneVremenskePodatke(filtriraniPodaci);
  }
    

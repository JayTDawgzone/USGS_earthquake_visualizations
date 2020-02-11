let geoJson = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';



let mymap = L.map('map').setView([41.63, -99.65], 5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 10,
    id: 'mapbox/outdoors-v11',
    accessToken: 'pk.eyJ1IjoidGVycmE5MjUiLCJhIjoiY2s2M3dxODVkMDljODNqbXB5Y25qemk5YyJ9.ifYuDpsCr2sT1xeicJcxgg'
}).addTo(mymap);



d3.json(geoJson, function (error, response) {
  features = response.features
  console.log(features)
  L.geoJson(response, {


    pointToLayer: function (feature, coordinates) {

        let mag = +feature.properties.mag;

        let colorScale = d3.scaleLinear()
            .domain([1,8])
            .range(["green", "red"])
            .interpolate(d3.interpolateHsl);

        let geojsonMarkerOptions = {
            radius: mag*3,
            fillColor: colorScale(mag),
            color: "#fff",
            weight: .1,
            opacity: 1,
            fillOpacity: 0.7
        };

        return L.circleMarker(coordinates, geojsonMarkerOptions);
    },

    onEachFeature: function(feature, coordinates) {
      let time = new Date(feature.properties.time)
      let timeString = time.toTimeString()
      coordinates.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}<br> Time: ${timeString}`)

    }

}).addTo(mymap)

    let colorScale = d3.scaleLinear()
    .domain([0,8])
    .range(["green", "red"])
    .interpolate(d3.interpolateHsl);

    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function() {
      let div = L.DomUtil.create('div', 'info legend');
      let limits = d3.range(8);
      let labels = []

      div.innerHTML = `<h1>Earthquake Magnitude</h1>
        <div class="labels">
          <div class="min">1</div>
          <div class="max">8+</div>
        </div>`;

      limits.forEach((limit,index)=> {
        labels.push('<li style="background-color: ' + colorScale(index) + '"></li>')
      })

      div.innerHTML += '<ul>' + labels.join('') + '</ul>';
      return div
    };

legend.addTo(mymap);


});

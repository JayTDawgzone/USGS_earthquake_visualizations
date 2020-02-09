let geoJson = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';



var mymap = L.map('map').setView([41.63, -99.65], 5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 10,
    id: 'mapbox/dark-v10',
    accessToken: 'pk.eyJ1IjoidGVycmE5MjUiLCJhIjoiY2s2M3dxODVkMDljODNqbXB5Y25qemk5YyJ9.ifYuDpsCr2sT1xeicJcxgg'
}).addTo(mymap);



d3.json(geoJson, function (error, response) {

  L.geoJson(response, {

    // add circle markers
    pointToLayer: function (feature, latlng) {

        // magnitude
        var mag = +feature.properties.mag;

        // circle marker color scale
        var colorScale = d3.scaleLinear()
            .domain([1,8])
            .range(["lightblue", "red"])
            .interpolate(d3.interpolateHsl);

        // circle marker options
        var geojsonMarkerOptions = {
            radius: mag*5,
            fillColor: colorScale(mag),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        return L.circleMarker(latlng, geojsonMarkerOptions);
    }

}).addTo(mymap);

  L.geoJson(response, {

    createFeatures: function (feature, layer) {

      var mag = +feature.properties.mag;



    }

  })


    // circle marker color scale
    var colorScale = d3.scaleLinear()
    .domain([0,8])
    .range(["green", "red"])
    .interpolate(d3.interpolateHsl);

    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function() {
      var div = L.DomUtil.create('div', 'info legend');
      var limits = d3.range(8);
      // console.log(colors)
      var labels = []

      // Add min & max
      div.innerHTML = `<h1>Earthquake Intensity</h1>
        <div class="labels">
          <div class="min">1</div>
          <div class="max">8+</div>
        </div>`;

      limits.forEach((d,i)=> {
        labels.push('<li style="background-color: ' + colorScale(i) + '"></li>')
      })
      // console.log(labels)

      div.innerHTML += '<ul>' + labels.join('') + '</ul>';
      // console.log(div.innerHTML)
      return div
    };

legend.addTo(mymap);





});

<template>
  <div id="parent">
    <div id="mapContainer" class="basemap"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';


export default {
  name: "SortLocation",
  data() {
    return {
      accessToken:
        " ",
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    var map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [123.921969, 10.329892],
      zoom: 12
    });
    var customData = {
      features: [
        {
          type: "Feature",
          properties: {
            title: "Sioki Sarix2 Store",
            description: "A northside park that is home to the Lincoln Park Zoo",
            distance: [0,0],
          },
          geometry: {
            coordinates: [123.922302, 10.331634],
            type: "Point"
          }
        },
        {
          type: "Feature",
          properties: {
            title: "Consuelo Village Chapel",
            description: "A pplace for worship",
            distance: [0,0],
          },
          geometry: {
            coordinates: [123.948709, 10.359120],
            type: "Point"
          }
        },
        {
          type: "Feature",
          properties: {
            title: "St. Martin Village",
            description: "A pplace for worship",
            distance: [0,0],
          },
          geometry: {
            coordinates: [123.926741, 10.338254],
            type: "Point"
          }
        },
        {
          type: "Feature",
          properties: {
            title: "Un Apartment",
            description: "St. Mathew, St. Hermag Village",
            distance: [0,0],
          },
          geometry: {
            coordinates: [123.945994, 10.352769],
            type: "Point"
          }
        },
        {
          type: "Feature",
          properties: {
            title: "Sta. Lucia Village",
            description:
              "aihasd bjshriuwba ieenchdoriryfnsie",
            distance: [0,0],
          },
          geometry: {
            coordinates: [123.918751, 10.330543],
            type: "Point"
          }
        }
      ],
      type: "Feature Collection"
    };

    function getCoordinates(){
      
    }

    function getDistance(to) {
      //turf.js
      var from_place = turf.point([123.921969, 10.329892]); 
      var to_place = turf.point(to);
      var options = { units: "kilometers" };
      var distance = turf.distance(from_place, to_place, options);
      console.log("distance: ", distance);
      return distance;
    }

    // add markers to map
    customData.features.forEach(function(marker) {
      // create a HTML element for each feature
      var el = document.createElement("div");
      el.className = "marker";

    
    var dist = getDistance(marker.geometry.coordinates);
    marker.properties.distance = Math.round(dist * 100) / 100;
    console.log("Marker Properties Distance: ", marker.properties.distance);

      // make a marker for each feature and add to the map
      new mapboxgl.Marker()
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              "<h3>" +
                marker.properties.title +
                "</h3><p>" +
                marker.properties.description +
                "</p><p>" +
                marker.properties.distance +
                " kilometers away from your location</p>"
            )
        )
        .addTo(map);
    });

  },
};
</script>

<style scoped>
.basemap {
  width: 100%;
  height: 80vh !important;
}
#parent {
  padding-left: 10px;
  padding-right: 10px;
  height: 80vh;
}
.marker {
  background-image: url("../assets/mapbox-icon.png");
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
.mapboxgl-popup {
  max-width: 200px;
}

.mapboxgl-popup-content {
  text-align: center;
  font-family: "Open Sans", sans-serif;
}
</style>

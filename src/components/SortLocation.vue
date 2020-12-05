<template>
  <div id="parent">
    <div id="mapContainer" class="basemap"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import axios from "axios";
import { connect } from "tls";

export default {
  name: "SortLocation",
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiamllbnhpeWEiLCJhIjoiY2tlaTM3d2VrMWcxczJybjc0cmZkamk3eiJ9.JzrYlG2kZ08Pkk24hvKDJw",
      address: [],
      customData: {
        features: []
      }
    };
  },
  beforeCreate() {
    let config = {};
    config.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Access-Control-Allow-Origin": "*"
    };
    this.config = config;
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    var map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [123.921969, 10.329892],
      zoom: 12
    });

    axios.get(this.url + "/api/posts/delivery", this.config).then(response => {
      setTimeout(() => {
        this.$vloading.hide();
      }, 1000);
      var result = response.data.data;
      console.log("=====", result);
      result.forEach(element => {
        let {
          building_or_street,
          barangay,
          city_or_municipality,
          province,
          latitude,
          longitude,
          distance,
        } = element;

        let full_address = building_or_street.concat(
          " ",
          barangay,
          " ",
          city_or_municipality,
          " ",
          province
        );

        

        // axios
        //   .get(
        //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${full_address}.json?&limit=2&access_token=${
        //       this.accessToken
        //     }`
        //   )
        //   .then(response => {

        //     let res = response.data;

        //     //getting the distance
        //     var from_place = turf.point([123.921969, 10.329892]);
        //     var to_place = turf.point(res.features[0].geometry.coordinates);
        //     var options = { units: "kilometers" };
        //     var distance = turf.distance(from_place, to_place, options);

            // add markers to map
            var el = document.createElement("div");
            el.className = "marker";

            // make a marker for each feature and add to the map
            new mapboxgl.Marker()
              .setLngLat([longitude,latitude])
              .setPopup(
                new mapboxgl.Popup() // add popups
                  .setHTML(
                    "<h3>" +
                      full_address +
                      "</h3><p>" +
                      distance +
                      " kilometers away from your location</p>"
                  )
              )
              .addTo(map);
        //   });
      });
    });
  },
  methods: {}
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
  /* background-image: url("../assets/mapbox-icon.png"); */
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

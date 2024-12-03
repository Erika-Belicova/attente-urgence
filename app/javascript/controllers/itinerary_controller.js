import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    // marker: Array,
    marker: Object,
  }

  connect() {
    console.log("Map connected")
    console.log(this.markerValue)
    console.log(this.apiKeyValue)

    const options = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 10000,
    }

    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      center: [this.markerValue.lng, this.markerValue.lat],
      style: "mapbox://styles/mapbox/standard",
      zoom: 17
    })

    this.map.on('load', () => {
      const locData = localStorage.getItem("locData")
      if (locData) {
        const locDataParsed = JSON.parse(locData)
        this.getRoute(locDataParsed)
      } else {
        navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error, options);
      }
    })
};

  success(pos) {
    const crd = pos.coords;
    this.getRoute(crd)
  };

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  getRoute(crd) {
    const start = [crd.longitude, crd.latitude]
    const end = [this.markerValue.lng, this.markerValue.lat]

    fetch(`https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`)
    .then(response => response.json())
    .then((data) => {
      const geojson = this.#getRouteCoordinates(data)
      // this.#loadImage('https://res.cloudinary.com/dgmantli3/image/upload/v1710240782/v2ltcwrc2j9klcoqiqty.png', 'location')
      // this.#loadImage('https://res.cloudinary.com/dgmantli3/image/upload/v1710241475/ku36ijrpcdjkarylqdoc.png', 'user_icon')
      this.#addRouteLayer(geojson)
      this.#addMarkerlayer(start, 'start', 'user_icon')
      this.#addMarkerlayer(end, 'end', 'location')
      this.#fitMapToMarkers(start, end)
    })
  }

  // #loadImage(url, name) {
  //   this.map.loadImage(
  //     url,
  //     (error, image) => {
  //         if (error) throw error;

  //         this.map.addImage(name, image);
  //     }
  //   );
  // }

  #getRouteCoordinates(data) {
    const itinary = data.routes[0].geometry.coordinates
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: itinary,
      },
    };
    return geojson
  }

  #addRouteLayer(geojson) {
    this.map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geojson,
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    })
  }

  #addMarkerlayer(markerData, id, image) {
    this.map.addLayer({
      id: id,
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: markerData,
              },
            },
          ],
        },
      },
      layout: {
        'icon-image': image, // reference the image
        'icon-size': 0.08
      },
    });

    this.#addMarkersToMap();
    this.#fitMapToMarkers();
  }

  #addMarkersToMap() {
    // this.markerValue.forEach((marker) => {
      // const popup = new mapboxgl.Popup().setHTML(marker.info_window_html) // Added info window to each marker
      new mapboxgl.Marker()
        .setLngLat([ this.markerValue.lng, this.markerValue.lat ])
        // .setPopup(popup) // Added info window to each marker
        .addTo(this.map)
    // })
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    // this.markerValue.forEach(marker =>
      bounds.extend([ this.markerValue.lng, this.markerValue.lat ])
    //)
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }

}

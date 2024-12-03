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


    const options = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    }

    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      center: [this.markerValue.lng, this.markerValue.lat],
      style: "mapbox://styles/mapbox/standard",
      zoom: 17
    })

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

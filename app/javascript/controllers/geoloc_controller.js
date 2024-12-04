import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="geoloc"
export default class extends Controller {
  static targets = ["inputLocation", "latitudeField", "longitudeField", "form"]

  connect() {
    this.searchLocation()
    this.formTarget.addEventListener("submit", this.handleSubmit.bind(this))
  }

  searchLocation() {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000
    }

    const locData = localStorage.getItem('locData')
    if (locData) {
      const locDataParsed = JSON.parse(locData)
      this.#setCoordinates(locDataParsed)
    } else {
      navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error, options)
    }
  }

  success(pos) {
    const crd = pos.coords
    const locData = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    }

    localStorage.setItem("locData", JSON.stringify(locData))

    this.#setCoordinates(locData)
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  #setCoordinates(locData) {
    // Mise à jour des champs cachés avec les coordonnées
    this.latitudeFieldTarget.value = locData.latitude
    this.longitudeFieldTarget.value = locData.longitude
  }

  handleSubmit(event) {
    event.preventDefault()
    // Soumettre le formulaire
    this.formTarget.submit()
  }
}

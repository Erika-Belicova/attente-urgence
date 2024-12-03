import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="geoloc"
export default class extends Controller {
  connect() { console.log("Geoloc connected")
    const locDataParsed = JSON.parse(locData)
    this.getRoute(locDataParsed)
  }
}

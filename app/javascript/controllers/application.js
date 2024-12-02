import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

// import FooterController from "./footer_controller.js"
// Stimulus.register("footer", FooterController)


export { application }

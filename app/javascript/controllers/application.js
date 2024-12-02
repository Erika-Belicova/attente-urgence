import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

import CountdownController from "./countdown_controller.js"
Stimulus.register("countdown", CountdownController)

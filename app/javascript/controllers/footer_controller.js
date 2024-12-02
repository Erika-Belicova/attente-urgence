import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["footer"]; // Définir une cible pour le footer

  connect() {
    console.log("connected");
    this.lastScrollY = window.scrollY; // Stocker la position de défilement initiale
    this.handleScroll = this.handleScroll.bind(this); // S'assurer que le contexte de la méthode est correct
    window.addEventListener("scroll", this.handleScroll); // Ajouter un listener de défilement
  }

  disconnect() {
    window.removeEventListener("scroll", this.handleScroll); // Nettoyer l'écouteur
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > this.lastScrollY) {
      // Si on défile vers le bas
      this.footerTarget.classList.add("hidden");
    } else {
      // Si on défile vers le haut
      this.footerTarget.classList.remove("hidden");
    }

    this.lastScrollY = currentScrollY; // Mettre à jour la position de défilement
  }
}

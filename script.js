document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // ANIMACIONES AL HACER SCROLL
  // ==========================================

  const elements = document.querySelectorAll(".reveal");

  // Si el navegador soporta IntersectionObserver
  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Una vez mostrado, dejamos de observarlo
          observer.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    elements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    // Respaldo para navegadores antiguos
    elements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  // ==========================================
  // MOSTRAR PORTADA INMEDIATAMENTE
  // ==========================================

  document.querySelectorAll(".hero .reveal").forEach((element) => {
    element.classList.add("visible");
  });

});
// ==========================================
// MENÚ WHATSAPP SUPERIOR
// ==========================================

function toggleWhatsapp() {
  const menu = document.getElementById("whatsappMenu");

  if (menu) {
    menu.classList.toggle("open");
  }
}


// ==========================================
// MENÚ WHATSAPP INFERIOR
// ==========================================

function toggleBottomWhatsapp() {
  const menu = document.getElementById("bottomWhatsappMenu");

  if (menu) {
    menu.classList.toggle("open");
  }
}


// ==========================================
// CERRAR MENÚS AL HACER CLIC FUERA
// ==========================================

document.addEventListener("click", function (event) {

  const topMenu = document.getElementById("whatsappMenu");
  const bottomMenu = document.getElementById("bottomWhatsappMenu");

  const topButton = document.querySelector(".contact-top");
  const bottomButton = document.querySelector(".contact-wa");

  if (
    topMenu &&
    topButton &&
    !topMenu.contains(event.target) &&
    !topButton.contains(event.target)
  ) {
    topMenu.classList.remove("open");
  }

  if (
    bottomMenu &&
    bottomButton &&
    !bottomMenu.contains(event.target) &&
    !bottomButton.contains(event.target)
  ) {
    bottomMenu.classList.remove("open");
  }

});

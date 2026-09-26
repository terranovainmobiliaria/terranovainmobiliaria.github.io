document.addEventListener("DOMContentLoaded", function () {

  // Mostrar elementos animados
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach((element) => {
    observer.observe(element);
  });

  // Mostrar inmediatamente lo que está en la portada
  setTimeout(() => {
    document.querySelectorAll(".hero .reveal").forEach((element) => {
      element.classList.add("active");
    });
  }, 150);

});

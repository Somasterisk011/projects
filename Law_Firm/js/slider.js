// Custom automatic carousel
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".bg-slide"); // target background slides
  const dotsContainer = document.getElementById("dots");
  const caption = document.getElementById("caption");
  let currentIndex = 0;
  let timer;

  // Create dots dynamically
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });

    // ✅ Use data-caption attribute instead of <img alt>
    caption.textContent = slides[index].dataset.caption || "";
    currentIndex = index;
  }

  function nextSlide() {
    let newIndex = (currentIndex + 1) % slides.length;
    showSlide(newIndex);
  }

  function goToSlide(index) {
    showSlide(index);
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 6000); // 6s autoplay
  }

  // Start autoplay
  showSlide(currentIndex);
  resetTimer();
});

// navbar
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 50;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

// Banner
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const banner = document.querySelector(".banner");
  const bannerHeight = banner.offsetHeight;
  const bannerImage = banner.querySelector("img");
  const bannerText = banner.querySelector("h1");

  const parallaxRate = 0.5;
  const opacityRate = 1.2;

  bannerImage.style.transform = `translateY(${scrollY * parallaxRate}px)`;

  bannerText.style.transform = `translateY(${scrollY * parallaxRate * 0.8}px)`;
  bannerText.style.opacity = 1 - (scrollY / bannerHeight) * opacityRate;
});

// Carousel
document.addEventListener("DOMContentLoaded", (event) => {
  const slides = document.querySelectorAll('input[name="slides"]');
  const carouselSection = document.querySelector("#home");
  let animationInterval;

  // Function to get the current slide index
  const getCurrentSlideIndex = () => {
    let currentIndex = 0;
    slides.forEach((slide, index) => {
      if (slide.checked) {
        currentIndex = index;
      }
    });
    return currentIndex;
  };

  // Function to start the animation
  const startAnimation = () => {
    animationInterval = setInterval(() => {
      const currentIndex = getCurrentSlideIndex();
      const nextIndex = (currentIndex + 1) % slides.length;
      slides[nextIndex].checked = true;
    }, 2000); // 2000ms delay for animation to the next slide
  };

  // Function to stop the animation
  const stopAnimation = () => {
    clearInterval(animationInterval);
  };

  // Intersection Observer to detect when the carousel section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(carouselSection);
});

// about


// card
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const cardContainer = document.querySelector(".card-container");
const cards = document.querySelector(".cards");

let cardWidth = document.querySelector(".card-product").offsetWidth + 20; // Adjusted for margin
let currentIndex = 0;

nextButton.addEventListener("click", () => {
  if (currentIndex < cards.children.length - 5) {
    currentIndex++;
    updateCarousel();
  }
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

function updateCarousel() {
  cards.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
}

window.addEventListener("resize", () => {
  cardWidth = document.querySelector(".card-product").offsetWidth + 20;
  updateCarousel();
});

window.addEventListener("error", (e) => console.log("Error:", e.message));
document.addEventListener("DOMContentLoaded", () => {
  initSearchBar();
  initStickyHeader();
  initSublistNavigation();
});

// -------------------------
// Search toggle
// -------------------------
function initSearchBar() {
  const searchIcon = document.querySelector(".search-bar .search-icon i");
  const searchBar = document.querySelector(".search-bar");
  const searchInput = document.querySelector(".search-bar .search-log");
  const closeIcon = document.querySelector(".search-bar .fa-xmark");

  if (searchIcon && searchBar && searchInput && closeIcon) {
    searchIcon.addEventListener("click", () => {
      document.querySelector(".search-icon").classList.toggle("hide");
      searchBar.style.border = "1px solid #b0ecefff";
      searchBar.style.transition = "all 0.5s ease";
      searchInput.classList.toggle("hide");
    });

    closeIcon.addEventListener("click", () => {
      document.querySelector(".search-icon").classList.toggle("hide");
      searchBar.style.border = "none";
      searchBar.style.transition = "all 0.5s ease";
      searchInput.classList.toggle("hide");
      const inputField = searchInput.querySelector("input");
      if (inputField) inputField.value = "";
    });
  }
}

// -------------------------
// Sticky Header
// -------------------------
function initStickyHeader() {
  const mainHeader = document.querySelector(".header-container");
  const stickyHeader = document.querySelector(".sticky-header");
  const carousel = document.querySelector("#carouselExampleCaptions"); // target carousel

  if (!mainHeader || !stickyHeader || !carousel) return;

  let lastScrollY = window.scrollY;
  let carouselHeight = carousel.offsetHeight;

  window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    // Show sticky header when scrolled past the carousel
    if (currentScroll > carouselHeight && currentScroll > lastScrollY) {
      stickyHeader.classList.add("show");
    }
    // Scrolling up but still below carousel bottom → keep sticky visible
    else if (currentScroll > carouselHeight && currentScroll < lastScrollY) {
      stickyHeader.classList.add("show");
    }
    // Hide when scrolling back up into the carousel section
    else if (currentScroll <= carouselHeight) {
      stickyHeader.classList.remove("show");
    }

    lastScrollY = currentScroll;
  });
}

document.addEventListener("DOMContentLoaded", initStickyHeader);

// -------------------------
// Sublist Navigation
// -------------------------
function initSublistNavigation() {
  const sublistNavItems = document.querySelectorAll(".nav-item.has-sublist");

  if (!sublistNavItems.length) return;

  sublistNavItems.forEach((item) => {
    const link = item.querySelector("a");
    const subListContainer = item.querySelector(".sub-list-container");

    if (link && subListContainer) {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        // Close other open sublists
        sublistNavItems.forEach((other) => {
          if (other !== item) {
            const otherContainer = other.querySelector(".sub-list-container");
            if (otherContainer) otherContainer.classList.remove("show");
          }
        });

        // Toggle current sublist
        subListContainer.classList.toggle("show");
      });
    }
  });

  // Close sublists when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item.has-sublist")) {
      sublistNavItems.forEach((item) => {
        const subListContainer = item.querySelector(".sub-list-container");
        if (subListContainer) subListContainer.classList.remove("show");
      });
    }
  });
}
// SUBLIST TOGGLE WITH EVENT DELEGATION
document.addEventListener("click", function (e) {
  const clickedItem = e.target.closest(".nav-item.has-sublist > a");
  const sublistContainer = e.target.closest(".sub-list-container");

  // ✅ If clicked a parent link
  if (clickedItem) {
    e.preventDefault();
    const parentItem = clickedItem.parentElement;
    const subList = parentItem.querySelector(".sub-list-container");

    // Close other open sublists
    document
      .querySelectorAll(".nav-item.has-sublist .sub-list-container.show")
      .forEach((el) => {
        if (el !== subList) {
          el.classList.remove("show");
        }
      });

    // Toggle current sublist
    subList.classList.toggle("show");
    return;
  }

  // ✅ If clicked outside any sublist → close all
  if (!sublistContainer) {
    document
      .querySelectorAll(".nav-item.has-sublist .sub-list-container.show")
      .forEach((el) => {
        el.classList.remove("show");
      });
  }
});
$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  navText: [
    '<i class="fa fa-chevron-left"></i>',
    '<i class="fa fa-chevron-right"></i>',
  ],
  responsive: {
    0: {
      items: 1,
    },
    700: {
      items: 3,
    },
    1000: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
});
var owl = $(".owl-carousel");
owl.owlCarousel({ items: 1, loop: true });

$(".next").click(function () {
  owl.trigger("next.owl.carousel");
});
$(".prev").click(function () {
  owl.trigger("prev.owl.carousel");
});

document.addEventListener("DOMContentLoaded", function () {
  const tickerRow = document.querySelector(".mov-row");
  // const clone = tickerRow.cloneNode(true);
  // tickerRow.parentElement.appendChild(clone); // duplicate for seamless loop
});

//card flip animation and function in team.html
document.querySelectorAll(".team-intro .card").forEach((card) => {
  card.addEventListener("click", () => {
    // remove flip from all cards first
    document
      .querySelectorAll(".team-intro .card")
      .forEach((c) => c.classList.remove("flipped"));

    // flip only the clicked card
    card.classList.add("flipped");
  });
});

// ===== Lawyer Directory Data =====
const lawyers = [
  {
    name: "Adv. Dev Prakash",
    category: "criminal",
    email: "devprakash@example.com",
    phone: "012-345-6789",
    address: "Odisha",
    website: "www.legacylawexperts.com",
  },
  {
    name: "Adv. Priya Sharma",
    category: "civil",
    email: "priya@example.com",
    phone: "012-345-6789",
    address: "Odisha",
    website: "www.legacylawexperts.com",
  },
  {
    name: "Adv. Rajesh Mehta",
    category: "family",
    email: "rajesh@example.com",
    phone: "012-345-6789",
    address: "Odisha",
    website: "www.legacylawexperts.com",
  },
  {
    name: "Adv. Neha Kapoor",
    category: "corporate",
    email: "neha@example.com",
    phone: "012-345-6789",
    address: "Odisha",
    website: "www.legacylawexperts.com",
  },
  {
    name: "Adv. Arjun Verma",
    category: "criminal",
    email: "arjun@example.com",
    phone: "012-345-6789",
    address: "Odisha",
    website: "www.legacylawexperts.com",
  },
  {
    name: "Adv. Saroj Khan",
    category: "corporate",
    email: "saroj@example.com",
    phone: "012-345-6789",
    address: "Odisha",
    website: "www.legacylawexperts.com",
  },
];

// Function to filter lawyers
function filterLawyers(category, btn = null) {
  const list = document.getElementById("lawyerList");
  if (!list) return; // stop if section not on page

  // Clear old cards
  list.innerHTML = "";

  // Highlight active button
  document
    .querySelectorAll(".category-buttons .theme-btn")
    .forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  // Filter data
  const filtered =
    category === "all"
      ? lawyers
      : lawyers.filter((l) => l.category === category);

  if (filtered.length === 0) {
    list.innerHTML = `<p>No lawyers available in this category.</p>`;
    return;
  }

  // Render cards
  filtered.forEach((lawyer) => {
    list.innerHTML += `
      <div class="col-md-6">
        <div class="lawyer-card p-4 shadow-sm rounded h-100">
          <h4>${lawyer.name}</h4>
          <p>${capitalize(lawyer.category)} Law</p>
          <div class="scocial d-flex flex-column justify-content-start">
            
            <p style="text-style: oblique;"> ${lawyer.email}</p>
            <p style="text-style: oblique;"> ${lawyer.phone}</p>
            <p style="text-style: oblique;"> ${lawyer.address}</p>
            <p style="text-style: oblique;"> ${lawyer.website}</p>
          </div>
        </div>
      </div>
    `;
  });
}

// Helper function
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Initialize on pages that have this section
document.addEventListener("DOMContentLoaded", () => {
  const firstBtn = document.querySelector(".category-buttons .theme-btn");
  const lawyerListEl = document.getElementById("lawyerList");

  if (firstBtn && lawyerListEl) {
    filterLawyers("all", firstBtn);
  }
});
//animation counter on statistic section

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  let animated = false; // ensure animation runs only once

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const isDecimal = counter.getAttribute("data-decimal");
      const duration = 2000; // total animation time in ms
      const step = target / (duration / 16); // ~60fps

      let count = 0;
      const updateCounter = () => {
        count += step;
        if (count < target) {
          counter.innerText = isDecimal ? count.toFixed(1) : Math.floor(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = isDecimal
            ? target.toFixed(1)
            : target.toLocaleString();
        }
      };
      updateCounter();
    });
  };

  // Intersection Observer to trigger when visible
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animateCounters();
          animated = true; // prevent repeat
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(document.querySelector(".career-statistics"));
});

//animation code here for AOS(Animate on Scroll).

AOS.init({
  offset: 300,
  delay: 100,
  duration: 1500, // how long animation lasts
  once: true, // ✅ ensures it happens only on first scroll-in
});

// Form submission with SweetAlert2 feedback
const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const action = form.action;

  try {
    const response = await fetch(action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Message Sent Successfully!",
        text: "Thank you for reaching out. We’ll contact you soon.",
        background: "#111",
        color: "#f9f9f9",
        iconColor: "#f5c542",
        showConfirmButton: false, // hide close button
        timer: 5000, // auto close after 5 seconds
        timerProgressBar: true,
        customClass: {
          popup: "swal2-rounded",
          timerProgressBar: "custom-timer-bar",
        },
        didClose: () => {
          form.reset(); // reset form after closing
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again later.",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#d33",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Unable to send your message. Check your connection.",
      background: "#111",
      color: "#fff",
      confirmButtonColor: "#d33",
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  /*  1) PRICE RANGE (slider) */
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");

  if (priceRange && priceValue) {
   
    priceValue.textContent = priceRange.value;

    
    priceRange.addEventListener("input", () => {
      priceValue.textContent = priceRange.value;
    });

   
    if (!priceRange.getAttribute("aria-label")) {
      priceRange.setAttribute("aria-label", "Maximum price filter");
    }
  }

  /*  2) SEARCH (filter by hotel name) */
  const searchInput = document.querySelector(".search-input");
  const cards = Array.from(document.querySelectorAll(".hotel-card"));

  if (searchInput && cards.length) {
    
    if (!searchInput.getAttribute("aria-label")) {
      searchInput.setAttribute("aria-label", "Search hotels");
    }

    const filterHotels = () => {
      const query = searchInput.value.trim().toLowerCase();

      cards.forEach((card) => {
        const title =
          card.querySelector(".hotel-title")?.innerText.toLowerCase() || "";
        card.style.display = title.includes(query) ? "" : "none";
      });
    };

    searchInput.addEventListener("input", filterHotels);
  }

 
  /* 3) BASIC KEYBOARD SUPPORT FOR NAV (optional but good) */
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((a) => {
  
    a.setAttribute("tabindex", "0");

    a.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        e.preventDefault();
        a.click();
      }
    });
  });

  /* 4) A11y for icon-only buttons  */
  const iconButtons = document.querySelectorAll(".heart-icon");
  iconButtons.forEach((btn) => {
    
    btn.setAttribute("role", "button");
    btn.setAttribute("tabindex", "0");
    if (!btn.getAttribute("aria-label")) {
      btn.setAttribute("aria-label", "Add to favorites");
    }

    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });
});

/* 5) GO TO ITEM DETAILS */
const magicCard = document.getElementById("hotel-magic");

if (magicCard) {
  
  magicCard.style.cursor = "pointer";
  magicCard.setAttribute("tabindex", "0");
  magicCard.setAttribute("role", "link");
  magicCard.setAttribute("aria-label", "Open Magic Palace details");

  const goToDetails = () => {
    window.location.href = "item-details.html"; 
  };

 
  magicCard.addEventListener("click", (e) => {
   
    if (e.target.closest("a")) return;
    goToDetails();
  });

  
  magicCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetails();
    }
  });
}

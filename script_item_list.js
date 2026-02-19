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
const hotelCards = document.querySelectorAll(".hotel-card");

hotelCards.forEach((card) => {
  card.style.cursor = "pointer";
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "link");
  
  if (!card.getAttribute("aria-label")) {
    const title = card.querySelector(".hotel-title")?.innerText || "View details";
    card.setAttribute("aria-label", `View details for ${title}`);
  }

  const goToDetails = () => {
    const id = card.getAttribute("data-id") || "1";
    window.location.href = `item-details.html?id=${id}`;
  };

  card.addEventListener("click", (e) => {
    // Prevent navigation if clicking on a link or the heart icon
    if (e.target.closest("a") || e.target.closest(".heart-icon")) return;
    goToDetails();
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetails();
    }
  });
});

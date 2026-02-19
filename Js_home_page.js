document.addEventListener("DOMContentLoaded", function () {
    const navbarHTML = `
    <nav class="navbar">
        <ul class="nav-links">
            <li><a href="index.html"><span>⌂</span> Home</a></li>
            <li><a href="#"><span>⚙️</span> Settings</a></li>
            <li><a href="#"><span>ⓘ</span> About</a></li>
            <li><a href="#"><span>❓</span>Help</a></li>
        </ul>
        <div class="nav-logo">
            <img src="./images/image.png" alt="Logo" height="50">
        </div>
    </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);

    const leftSidebarHTML = `
    <div class="filters-sidebar">
        <div class="action-bar">
            <div class="add-review-wrapper">
                <a href="review-form.html">
                    <button class="btn-add">+</button>
                    <h3 class="action-title">Add Review</h3>
                </a>
            </div>
            <div class="search-container">
                <input class="search-input" type="text" placeholder="search a place">
            </div>
        </div>
        <h3 class="sidebar-title">Find Your Perfect Stay</h3>
        <ul class="filters-list">
            <li class="filter-header">Location</li>
            <li><input type="checkbox" id="North"><label for="North">North District</label></li>
            <li><input type="checkbox" id="Sharon"><label for="Sharon">Sharon</label></li>
            <li><input type="checkbox" id="Center"><label for="Center">Center District</label></li>
            <li><input type="checkbox" id="Jerousalem"><label for="Jerousalem">Jerousalem</label></li>
            <li><input type="checkbox" id="South"><label for="South">South District</label></li>
            <li><input type="checkbox" id="Eilat"><label for="Eilat">Eilat</label></li>
            <li class="filter-header">Stay Place</li>
            <li><input type="checkbox" id="hotels"><label for="hotels">Hotels</label></li>
            <li><input type="checkbox" id="bbs"><label for="bbs">B&B's</label></li>
            <li><input type="checkbox" id="boutique"><label for="boutique">Boutique Hotels</label></li>
            <li><input type="checkbox" id="guests"><label for="guests">Guests houses</label></li>
            <li><input type="checkbox" id="villas"><label for="villas">Villas</label></li>
            <li class="filter-header">Vacation Style</li>
            <li><input type="checkbox" id="urban"><label for="urban">Urban</label></li>
            <li><input type="checkbox" id="beach"><label for="beach">Beach Getaway</label></li>
            <li><input type="checkbox" id="nature"><label for="nature">Nature</label></li>
            <li><input type="checkbox" id="romantic"><label for="romantic">Romantic</label></li>
            <li><input type="checkbox" id="family"><label for="family">Family Friendly</label></li>
            <li class="filter-header">Meal Plans</li>
            <li><input type="checkbox" id="breakfast"><label for="breakfast">Breakfast Included</label></li>
            <li><input type="checkbox" id="halfboard"><label for="halfboard">Half Board</label></li>
            <li><input type="checkbox" id="fullboard"><label for="fullboard">Full Board</label></li>
            <li><input type="checkbox" id="allinclusive"><label for="allinclusive">All-Inclusive</label></li>
            <li><input type="checkbox" id="selfcatering"><label for="selfcatering">Self-Catering</label></li>
            <li><a href="Item-List.html"><button class="btn-apply">Apply Filters</button></a></li>
        </ul>
    </div>
    `;

    const rightSidebarHTML = `
    <div class="filters-sidebar" style="margin-top: 50px;">
        <h3 class="sidebar-title">More Filters</h3>
        <ul class="filters-list">
            <li class="filter-header">Star Rating</li>
            <li><input type="checkbox" id="star5"><label for="star5">★★★★★</label></li>
            <li><input type="checkbox" id="star4"><label for="star4">★★★★☆</label></li>
            <li><input type="checkbox" id="star3"><label for="star3">★★★☆☆</label></li>
            <li><input type="checkbox" id="star2"><label for="star2">★★☆☆☆</label></li>
            <li><input type="checkbox" id="star1"><label for="star1">★☆☆☆☆</label></li>
            <li class="filter-header"><label for="priceRange">Price Range</label></li>
            <li><input type="range" min="0" max="1000" value="500" class="slider" id="priceRange" style="width: 100%;" oninput="document.getElementById('priceValue').innerText = this.value"></li>
            <li><p>Max Price: $<span id="priceValue">500</span></p></li>
            <li class="filter-header">Accessibility</li>
            <li><input type="checkbox" id="acc_wheel"><label for="acc_wheel">Wheelchair Access</label></li>
            <li><input type="checkbox" id="acc_elevator"><label for="acc_elevator">Elevator</label></li>
            <li class="filter-header">Facilities</li>
            <li><input type="checkbox" id="prop_pool"><label for="prop_pool">Pool</label></li>
            <li><input type="checkbox" id="prop_spa"><label for="prop_spa">Spa</label></li>
            <li><input type="checkbox" id="prop_gym"><label for="prop_gym">Gym</label></li>
            <li><input type="checkbox" id="prop_wifi"><label for="prop_wifi">Free Wi-Fi</label></li>
            <li><input type="checkbox" id="prop_parking"><label for="prop_parking">Parking</label></li>
            <li><a href="Item-List.html"><button class="btn-apply">Apply Filters</button></a></li>
        </ul>
    </div>
    `;

    const pageContainer = document.querySelector('.page-container');
    if (pageContainer) {
        pageContainer.insertAdjacentHTML('afterbegin', leftSidebarHTML);
        pageContainer.insertAdjacentHTML('beforeend', rightSidebarHTML);
    }
});
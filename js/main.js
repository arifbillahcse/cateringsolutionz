/* ===========================================================
   Catering Solutionz — Home Page Scripts
   =========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Language / Flag Dropdown ---------- */
  const langSelector = document.getElementById("langSelector");
  const langBtn      = document.getElementById("langBtn");
  const langDropdown = document.getElementById("langDropdown");
  const currentFlag  = document.getElementById("currentFlag");
  const currentLang  = document.getElementById("currentLang");

  if (langBtn) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = langSelector.classList.toggle("open");
      langBtn.setAttribute("aria-expanded", isOpen);
    });
  }

  document.querySelectorAll(".lang-option").forEach(option => {
    option.addEventListener("click", () => {
      const lang  = option.dataset.lang;
      const flag  = option.dataset.flag;
      const name  = option.dataset.name;

      // Update button display
      currentFlag.textContent = flag;
      currentLang.textContent = name;

      // Mark active
      document.querySelectorAll(".lang-option").forEach(o => o.classList.remove("active"));
      option.classList.add("active");

      // Close dropdown
      langSelector.classList.remove("open");
      langBtn.setAttribute("aria-expanded", "false");

      // Trigger Google Translate
      const gtSelect = document.querySelector(".goog-te-combo");
      if (gtSelect) {
        gtSelect.value = lang;
        gtSelect.dispatchEvent(new Event("change"));
      } else {
        // Fallback: use cookie method
        document.cookie = `googtrans=/en/${lang}; path=/`;
        location.reload();
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (langSelector && !langSelector.contains(e.target)) {
      langSelector.classList.remove("open");
      langBtn && langBtn.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById("preloader");
  const hero = document.getElementById("hero");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
      hero.classList.add("loaded");
    }, 600);
  });
  // Fallback in case 'load' is slow
  setTimeout(() => {
    preloader.classList.add("hidden");
    hero.classList.add("loaded");
  }, 2500);

  /* ---------- Sticky header shadow ---------- */
  const header = document.getElementById("header");
  const backTop = document.getElementById("backTop");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
    backTop.classList.toggle("show", window.scrollY > 500);
  });

  /* ---------- Mobile nav ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    nav.classList.toggle("open");
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      nav.classList.remove("open");
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${id}`));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add("in-view"), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".stat-num");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCount(el) {
    const target = +el.dataset.target;
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Render products ---------- */
  const products = [
    { name: "Stainless Steel Chafing Dish", cat: "Chafing Dishes", icon: "fa-fire-burner", price: "£59.00", old: "", badge: "New", badgeType: "", stars: 5 },
    { name: "24-Piece Cutlery Set", cat: "Cutlery", icon: "fa-utensils", price: "£39.00", old: "£49.00", badge: "-20%", badgeType: "hot", stars: 4 },
    { name: "Professional Stock Pot", cat: "Cookware", icon: "fa-kitchen-set", price: "£89.00", old: "", badge: "Hot", badgeType: "hot", stars: 5 },
    { name: "Porcelain Dinner Plates", cat: "Crockery", icon: "fa-plate-wheat", price: "£29.00", old: "", badge: "", badgeType: "", stars: 4 },
    { name: "Crystal Wine Glasses x6", cat: "Glassware", icon: "fa-wine-glass", price: "£24.00", old: "£32.00", badge: "Sale", badgeType: "hot", stars: 5 },
    { name: "Round Buffet Warmer", cat: "Chafing Dishes", icon: "fa-bowl-food", price: "£65.00", old: "", badge: "New", badgeType: "", stars: 5 },
    { name: "Insulated Coffee Urn", cat: "Beverage", icon: "fa-mug-hot", price: "£72.00", old: "", badge: "", badgeType: "", stars: 4 },
    { name: "Non-Stick Frying Pan", cat: "Cookware", icon: "fa-utensil-spoon", price: "£34.00", old: "£42.00", badge: "-19%", badgeType: "hot", stars: 5 },
  ];

  const grid = document.getElementById("productGrid");
  if (grid) {
    grid.innerHTML = products.map((p, i) => `
      <div class="product-card reveal" data-delay="${(i % 4) * 80}">
        <div class="product-thumb">
          ${p.badge ? `<span class="product-badge ${p.badgeType}">${p.badge}</span>` : ""}
          <i class="fa-solid ${p.icon}"></i>
          <div class="product-actions">
            <button aria-label="Quick view"><i class="fa-solid fa-eye"></i></button>
            <button aria-label="Wishlist"><i class="fa-solid fa-heart"></i></button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-cat">${p.cat}</span>
          <h4>${p.name}</h4>
          <div class="product-stars">${renderStars(p.stars)}</div>
          <div class="product-bottom">
            <span class="price">${p.price}${p.old ? `<span class="old">${p.old}</span>` : ""}</span>
            <button class="add-cart" aria-label="Add to cart"><i class="fa-solid fa-cart-plus"></i></button>
          </div>
        </div>
      </div>
    `).join("");

    // observe the freshly added product cards
    grid.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
  }

  function renderStars(n) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += `<i class="fa-${i <= n ? "solid" : "regular"} fa-star ${i <= n ? "" : "grey"}"></i>`;
    }
    return html;
  }

  /* ---------- Equipment section ---------- */
  const equipmentProducts = [
    {
      id: 1,
      name: "Stainless Steel Chafing Dish",
      category: "equipment",
      price: "$189.00",
      originalPrice: "$229.00",
      badge: "hot",
      image: "https://images.unsplash.com/photo-1585518419759-87aaa7ec8f42?w=400&h=400&fit=crop",
      description: "Professional grade stainless steel chafing dish with folding stand. Perfect for keeping food warm at events and buffets."
    },
    {
      id: 2,
      name: "Professional Food Warmer",
      category: "equipment",
      price: "$249.00",
      originalPrice: "$299.00",
      badge: "sale",
      image: "https://images.unsplash.com/photo-1584568694244-14fbbc50d737?w=400&h=400&fit=crop",
      description: "Electric food warmer with adjustable temperature control. Maintains food quality for hours."
    },
    {
      id: 3,
      name: "Premium Serving Utensils Set",
      category: "tableware",
      price: "$89.99",
      originalPrice: null,
      badge: "new",
      image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&h=400&fit=crop",
      description: "Complete serving utensil set with elegant design. Includes spoons, forks, and ladles."
    },
    {
      id: 4,
      name: "Elegant Buffet Stand",
      category: "equipment",
      price: "$329.00",
      originalPrice: "$379.00",
      badge: null,
      image: "https://images.unsplash.com/photo-1570521944256-9b06a35f5dca?w=400&h=400&fit=crop",
      description: "Premium buffet stand with adjustable height. Creates a professional catering setup."
    }
  ];

  let equipmentTab = "all";

  function renderEquipment() {
    const filtered = equipmentTab === "all"
      ? equipmentProducts
      : equipmentProducts.filter(p => p.category === equipmentTab);

    const grid = document.getElementById("equipmentGrid");
    if (!grid) return;

    grid.innerHTML = filtered.map((product, i) => `
      <div class="equipment-item reveal" data-delay="${i * 80}">
        <div class="equipment-img">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${product.badge ? `<span class="equipment-badge ${product.badge}">${product.badge}</span>` : ''}
        </div>
        <div class="equipment-body">
          <div class="equipment-cat">${product.category}</div>
          <h4 class="equipment-name">${product.name}</h4>
          <div class="equipment-price">
            ${product.price}
            ${product.originalPrice ? `<span class="old">${product.originalPrice}</span>` : ''}
          </div>
        </div>
      </div>
    `).join("");

    // Re-observe new cards
    grid.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    // Update featured product
    const featured = filtered[0];
    const featuredImg = document.getElementById("equipmentFeaturedImg");
    if (featuredImg) {
      featuredImg.innerHTML = `<img src="${featured.image}" alt="${featured.name}" loading="lazy">`;
    }
    const featuredCat = document.getElementById("equipmentFeaturedCat");
    if (featuredCat) featuredCat.textContent = featured.category;
    const featuredName = document.getElementById("equipmentFeaturedName");
    if (featuredName) featuredName.textContent = featured.name;
    const featuredPrice = document.getElementById("equipmentFeaturedPrice");
    if (featuredPrice) featuredPrice.textContent = featured.price;
    const featuredDesc = document.getElementById("equipmentFeaturedDesc");
    if (featuredDesc) featuredDesc.textContent = featured.description;
  }

  // Equipment tab buttons
  document.querySelectorAll(".equipment-tab-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      document.querySelectorAll(".equipment-tab-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      equipmentTab = this.dataset.tab;
      renderEquipment();
    });
  });

  renderEquipment();

  /* ---------- Cart counter demo ---------- */
  const cartCount = document.querySelector(".cart-count");
  let count = 0;
  document.addEventListener("click", (e) => {
    if (e.target.closest(".add-cart")) {
      count++;
      cartCount.textContent = count;
      const btn = e.target.closest(".add-cart");
      btn.style.transform = "scale(1.3) rotate(15deg)";
      setTimeout(() => (btn.style.transform = ""), 250);
    }
  });

});

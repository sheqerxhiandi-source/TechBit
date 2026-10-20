// ============================================================
// script.js
// Shared logic for ALL pages: cart storage, header cart badge,
// and page-specific rendering (each render function checks
// whether its target element exists on the current page before
// doing anything, so one file can safely be included everywhere).
//
// Cart is persisted in the browser's localStorage under the key
// "techbit_cart" as { "<productId>": quantity, ... } so it stays
// in sync across index.html / shop.html / product.html / cart.html.
// ============================================================

const CART_KEY = "techbit_cart";

// ---------- Cart storage helpers ----------
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateHeaderCart();
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
}

function setQty(id, qty) {
  const cart = getCart();
  if (qty <= 0) {
    delete cart[id];
  } else {
    cart[id] = qty;
  }
  saveCart(cart);
  renderCartPage(); // refresh cart page rows/totals if we're on cart.html
}

function removeFromCart(id) {
  setQty(id, 0);
}

function cartCount() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, q) => sum + q, 0);
}

function cartTotal() {
  const cart = getCart();
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = findProduct(id);
    return sum + (p ? p.price * qty : 0);
  }, 0);
}

// Updates the little cart badge + total shown in the header on every page
function updateHeaderCart() {
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = cartCount());
  document.querySelectorAll(".cart-total-amount").forEach(el => el.textContent = "€" + cartTotal().toFixed(2));
}

// ---------- Home page: Popular Products grid (#product-grid) ----------
function renderHomeProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const popular = PRODUCTS.filter(p => p.popular);
  grid.innerHTML = popular.map(productCardHTML).join("");
}

// Reusable product card markup used by home + shop pages
function productCardHTML(p) {
  return `
    <div class="product-card">
      <a href="product.html?id=${p.id}" class="product-thumb"><i class="${p.icon}"></i></a>
      <h4><a href="product.html?id=${p.id}">${p.name}</a></h4>
      <div class="product-footer">
        <span class="product-price">€${p.price.toFixed(2)}</span>
        <button title="Add to cart" onclick="addToCart(${p.id}); event.stopPropagation();">
          <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </div>
  `;
}

// ---------- Shop page: full catalog (#shop-grid) ----------
function renderShopPage() {
  const grid = document.getElementById("shop-grid");
  if (!grid) return;

  const searchInput = document.getElementById("shop-search");
  const categoryLinks = document.querySelectorAll("#shop-categories li");

  // Support links like shop.html?cat=Sensors%20%26%20Modules from index.html
  const urlCategory = new URLSearchParams(window.location.search).get("cat");
  let activeCategory = "All";

  if (urlCategory) {
    const matchingLi = Array.from(categoryLinks).find(li => li.dataset.category === urlCategory);
    if (matchingLi) {
      categoryLinks.forEach(x => x.classList.remove("active"));
      matchingLi.classList.add("active");
      activeCategory = urlCategory;
    }
  }

  function draw() {
    const term = (searchInput ? searchInput.value : "").toLowerCase().trim();
    const filtered = PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
    grid.innerHTML = filtered.length
      ? filtered.map(productCardHTML).join("")
      : `<p class="empty-msg">No products match your search/filter.</p>`;
    document.getElementById("shop-count").textContent = filtered.length;
  }

  categoryLinks.forEach(li => {
    li.addEventListener("click", (e) => {
      e.preventDefault();
      categoryLinks.forEach(x => x.classList.remove("active"));
      li.classList.add("active");
      activeCategory = li.dataset.category;
      draw();
    });
  });

  if (searchInput) searchInput.addEventListener("input", draw);

  draw();
}

// ---------- Product detail page (#product-detail) ----------
function renderProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = findProduct(id);

  if (!product) {
    container.innerHTML = `<p>Product not found. <a href="shop.html">Back to shop</a></p>`;
    return;
  }

  document.title = product.name + " - TechBit";

  container.innerHTML = `
    <nav class="breadcrumb"><a href="index.html">Home</a> / <a href="shop.html">Shop</a> / ${product.name}</nav>
    <div class="detail-layout">
      <div class="detail-image"><i class="${product.icon}"></i></div>
      <div class="detail-info">
        <span class="detail-category">${product.category}</span>
        <h1>${product.name}</h1>
        <p class="detail-price">€${product.price.toFixed(2)}</p>
        <p class="detail-desc">${product.desc}</p>
        <div class="detail-actions">
          <input type="number" id="qty-input" value="1" min="1" />
          <button class="btn-primary" id="add-to-cart-btn">Add to Cart <i class="fa-solid fa-cart-shopping"></i></button>
        </div>
        <ul class="detail-meta">
          <li><i class="fa-solid fa-bolt"></i> Fast Shipping</li>
          <li><i class="fa-solid fa-shield-halved"></i> Secure Payments</li>
          <li><i class="fa-solid fa-rotate-left"></i> Easy Returns</li>
        </ul>
      </div>
    </div>
  `;

  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    const qty = parseInt(document.getElementById("qty-input").value, 10) || 1;
    addToCart(product.id, qty);
    alert(`Added ${qty} x ${product.name} to cart.`);
  });
}

// ---------- Cart page (#cart-items) ----------
function renderCartPage() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  const cart = getCart();
  const entries = Object.entries(cart);

  if (!entries.length) {
    container.innerHTML = `<p class="empty-msg">Your cart is empty. <a href="shop.html">Browse products</a></p>`;
    document.getElementById("cart-summary-total").textContent = "€0.00";
    return;
  }

  container.innerHTML = entries.map(([id, qty]) => {
    const p = findProduct(id);
    if (!p) return "";
    return `
      <div class="cart-row">
        <div class="cart-row-thumb"><i class="${p.icon}"></i></div>
        <div class="cart-row-info">
          <h4>${p.name}</h4>
          <span>€${p.price.toFixed(2)} each</span>
        </div>
        <div class="cart-row-qty">
          <button onclick="setQty(${id}, ${qty - 1})">-</button>
          <span>${qty}</span>
          <button onclick="setQty(${id}, ${qty + 1})">+</button>
        </div>
        <div class="cart-row-subtotal">€${(p.price * qty).toFixed(2)}</div>
        <button class="cart-row-remove" onclick="removeFromCart(${id})"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
  }).join("");

  document.getElementById("cart-summary-total").textContent = "€" + cartTotal().toFixed(2);
}

// ---------- Contact page form (#contact-form) ----------
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("contact-success").style.display = "block";
    form.reset();
  });
}

// ---------- Init on every page ----------
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderCart();
  renderHomeProducts();
  renderShopPage();
  renderProductDetail();
  renderCartPage();
  initContactForm();

  // Hero slider dots (index.html only, harmless elsewhere since it's empty NodeList)
  document.querySelectorAll(".slider-dots .dot").forEach(dot => {
    dot.addEventListener("click", () => {
      document.querySelectorAll(".slider-dots .dot").forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });

  // Checkout button on cart.html (demo only, no real backend)
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cartCount() === 0) {
        alert("Your cart is empty.");
        return;
      }
      alert("This is a demo checkout — connect a real payment/backend here.");
    });
  }
});

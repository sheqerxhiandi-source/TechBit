# TechBit Website — Documentation

This is a static, framework-free website (plain HTML/CSS/JS) inspired by the
"TechBit" electronics store screenshot you shared. It's built so it can be
copied to any computer and opened directly in a browser — no install, no
server, no build step required.

---

## 1. What was built

A 5-page demo e-commerce site:

| Page            | File            | Purpose                                                              |
|------------------|-----------------|------------------------------------------------------------------------|
| Home             | `index.html`    | Hero banner, category sidebar, category cards, "Popular Products"     |
| Shop             | `shop.html`     | Full product catalog with category filter (sidebar) + live search box |
| Product detail   | `product.html`  | Single product view (reached via `product.html?id=<id>`), qty + add to cart |
| Cart             | `cart.html`     | Shows items added to cart, quantity +/- controls, remove, totals      |
| Contact          | `contact.html`  | Contact info + a demo message form (no backend, just a "sent" message) |

Supporting files (used by every page):

| File            | Purpose |
|------------------|---------|
| `style.css`      | All styling — dark theme matching the screenshot, plus layout for every page |
| `products.js`    | The **single source of truth** for product data (name, price, category, description, icon) |
| `script.js`      | All behavior: cart storage/logic, rendering product grids, product detail page, cart page, contact form, shop filters |

There is no backend/database — "add to cart" and quantities are stored in the
browser's `localStorage` (key `techbit_cart`), so the cart persists across
page reloads and across the 4 pages, but only on that one browser/computer.
Checkout and the contact form are demo-only (they show an alert/message
instead of actually sending data anywhere).

Icons come from the Font Awesome CDN (`https://cdnjs.cloudflare.com/...`),
so an internet connection is needed for icons to display. Everything else
works fully offline.

---

## 2. How to move/run it on another laptop

1. Copy the entire `techbit-webpage` folder (USB drive, cloud storage, email,
   `scp`, etc. — whatever's easiest).
2. On the other computer, double-click `index.html` to open it in any browser
   (Chrome, Firefox, Edge...). That's it — no Node, no Python, no server needed.
3. If you want it fully offline (icons included), download Font Awesome's
   CSS/webfont files locally and change the `<link rel="stylesheet" href="https://cdnjs...">`
   line in each HTML file to point at the local copy instead.

---

## 3. Where to make common changes

### Change products, prices, descriptions, categories
Edit **`products.js`** only. There's one array called `PRODUCTS`, e.g.:

```js
{ id: 1, name: "ESP32 DevKit V1", price: 6.50, icon: "fa-solid fa-microchip",
  category: "Development Boards", popular: true,
  desc: "A powerful Wi-Fi + Bluetooth development board..." }
```

- `id` — must be unique; used in URLs like `product.html?id=1`.
- `price` — a number (no currency symbol).
- `icon` — a Font Awesome icon class (used as a placeholder image). Browse
  icons at https://fontawesome.com/icons.
- `category` — must exactly match one of the category names used in the
  sidebar filters (`shop.html`'s `#shop-categories` list, or `index.html`'s
  sidebar) if you want filtering to work correctly.
- `popular` — `true` shows the product in the Home page "Popular Products"
  row; `false` means it only shows up in the full Shop catalog.

Because every page reads from this same file, you only ever edit product
data **once**, in one place.

### Replace the placeholder "images" with real product photos
Currently, product images are simulated with a Font Awesome icon inside a
colored box (see `.product-thumb`, `.board-placeholder`, `.detail-image`,
`.cart-row-thumb` in `style.css`). To use real photos:

1. Create an `images/` folder in `techbit-webpage/` and put your photos there.
2. In `products.js`, add an `image` field per product, e.g.
   `image: "images/esp32.jpg"`.
3. In `script.js`, inside `productCardHTML()` (and similarly in
   `renderProductDetail()` / `renderCartPage()`), replace the
   `<i class="${p.icon}"></i>` placeholder with
   `<img src="${p.image}" alt="${p.name}">` and add basic `img { width:100%;
   height:100%; object-fit:cover; }` CSS for `.product-thumb img` etc.

### Change colors / overall look
All colors are defined as CSS variables at the top of **`style.css`**:

```css
:root {
  --bg: #060a14;        /* page background */
  --bg-panel: #0b1120;  /* header/sidebar/cards background */
  --bg-card: #101827;   /* inner card background */
  --border: #1e293b;    /* borders */
  --text: #e5e7eb;      /* main text color */
  --text-dim: #94a3b8;  /* secondary/muted text */
  --accent: #2563eb;    /* primary blue (buttons) */
  --accent-light: #3b82f6; /* lighter blue (links/icons) */
}
```
Change these values to re-theme the entire site at once.

### Change navigation links / menu items
Each page repeats the same header/nav markup (`<div class="topbar">`,
`<header class="header">`, `<nav class="navbar">`) near the top of its HTML
file. Since there's no templating system, if you rename or add a nav item,
update it in **all 5 HTML files** to keep them consistent.

### Change category list (sidebar)
- On `index.html`: edit the `<aside class="sidebar"><ul>...</ul></aside>`
  list. Each `<li>` links to `shop.html?cat=<Category Name>` so clicking it
  opens the shop pre-filtered.
- On `shop.html`: edit the `<ul id="shop-categories">` list — each `<li>`
  needs a `data-category="..."` attribute matching a `category` value used
  in `products.js`. `script.js`'s `renderShopPage()` reads these to filter.

### Change cart/checkout behavior
All cart logic lives in **`script.js`**:
- `getCart()` / `saveCart()` — read/write the cart from `localStorage`.
- `addToCart(id, qty)`, `setQty(id, qty)`, `removeFromCart(id)` — modify cart contents.
- `cartCount()` / `cartTotal()` — compute totals shown in the header + cart page.
- The "Checkout" button click handler (bottom of `script.js`, inside the
  `DOMContentLoaded` listener) currently just shows an `alert(...)`. Replace
  that with a real checkout flow (e.g. a fetch() call to your backend or a
  payment provider's SDK) when you're ready to go live.

### Change the contact form behavior
`initContactForm()` in `script.js` just prevents the real page submit and
shows a "Thanks!" message. To actually send messages, you'll need a backend
(e.g. a serverless function, or a form service like Formspree) and to change
the `<form>`'s `action`/`method` or the JS `fetch()` call accordingly.

---

## 4. File-by-file quick reference

```
techbit-webpage/
├── index.html         Home page markup
├── shop.html           Shop/catalog page markup
├── product.html        Product detail page markup (content filled by JS)
├── cart.html           Cart page markup (content filled by JS)
├── contact.html         Contact page markup
├── style.css            ALL styling for every page
├── products.js           Product data (edit here to add/remove/change products)
├── script.js              Cart logic + all dynamic rendering (product grids,
│                          product detail, cart, shop filters, contact form)
└── DOCUMENTATION.md        This file
```

---

## 5. Known limitations (since this is a front-end-only skeleton)

- No real backend: no real payments, no persisted orders, no user accounts.
- Cart data is stored only in that browser's `localStorage` — clearing
  browser data or switching browsers/computers loses the cart.
- Product "images" are icon placeholders, not real photos (see section 3).
- Search/filtering happens only within the currently loaded product list —
  there's no server-side search.

These are all reasonable next steps once you're ready to add a real backend
(Node/Express, PHP, Django, etc.) or a hosted e-commerce platform.

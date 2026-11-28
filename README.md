# TechBit

TechBit is a responsive, static electronics-store website for browsing development boards, sensors, components, tools, and other products for makers and engineers in Kosovo.

The project uses plain HTML, CSS, and JavaScript—no framework, backend, build process, or package installation is required.

**Live demo:** https://sheqerxhiandi-source.github.io/TechBit/

## Features

- Responsive home page with hero banner, category navigation, and popular products
- Product catalog with live search and category filtering
- Individual product detail pages
- Persistent shopping cart using browser `localStorage`
- Quantity controls and automatic cart totals
- Product search through the shared product catalog
- Contact form that opens a pre-filled email message
- Mobile navigation and a responsive layout
- Centralized product data and reusable JavaScript functions
- GitHub Pages-friendly routes for the main website pages

## Website Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero section, categories, and popular products |
| Shop | `shop.html` | Complete catalog with search and category filters |
| Product | `product.html` | Product details, quantity selection, and add-to-cart action |
| Cart | `cart.html` | Cart items, quantity changes, removal, and total |
| Contact | `contact.html` | Store contact details and email message form |

## Technology

- HTML5
- CSS3
- JavaScript (ES6)
- Browser `localStorage`
- Font Awesome 6.5.1 icons through CDN

There is no server-side component or database. Product and cart behavior runs entirely in the browser.

## Getting Started

### View locally

1. Clone the repository:

   ```bash
git clone https://github.com/sheqerxhiandi-source/TechBit.git
   cd TechBit
   ```

2. Switch to the improvement branch:

   ```bash
git checkout Improvement_branch
   ```

3. Open `index.html` directly in a browser, or serve the directory locally:

   ```bash
python3 -m http.server 8000
   ```

4. Visit `http://localhost:8000`.

Running a local server is recommended because it gives URLs and browser behavior a closer match to the deployed GitHub Pages site.

## Product Catalog

Products are maintained in `products.js` through the `PRODUCTS` array:

```js
{
  id: 1,
  name: "ESP32 DevKit V1 ESP32-WROOM-32",
  price: 12.99,
  icon: "fa-solid fa-microchip",
  image: "images/product-crops/esp32-user-photo-cutout.png",
  category: "Development Boards",
  popular: true,
  desc: "ESP32-WROOM-32 development board..."
}
```

- `id` must be unique and is used in product URLs and cart state.
- `price` is a numeric value in euros.
- `icon` is a Font Awesome icon used as a fallback.
- `image` is the path to a product image.
- `category` controls catalog filtering.
- `popular` determines whether the item appears on the home page.
- `desc` supplies the product description.

Edit `products.js` only to add, remove, or update catalog entries.

## Customizing the Website

- **Product data:** `products.js`
- **Shared behavior and rendering:** `script.js`
- **Colors and layout:** `style.css`
- **Home page:** `index.html`
- **Catalog:** `shop.html`
- **Product page:** `product.html`
- **Cart:** `cart.html`
- **Contact page:** `contact.html`
- **Images:** `images/`

Reusable CSS variables are defined near the top of `style.css`. Replace product images in `images/` or update the `image` paths in `products.js` to change catalog artwork.

## Cart Behavior

The cart is stored in `localStorage` under:

```text
techbit_cart
```

It is organized as a map of product IDs to quantities:

```json
{
  "1": 2,
  "4": 1
}
```

The cart remains in the same browser even after a reload, but it is not shared across browsers or devices. Clearing the site's browser storage removes the cart.

## Contact Form

The contact form does not send data to a backend. It creates a `mailto:` link addressed to `Techbit.ks@gmail.com` with the visitor's name, email, and message pre-filled.

A mail application must be configured on the visitor's device for the message to be sent.

## Deployment

The site is designed for GitHub Pages and uses a repository-level base path.

To deploy from a branch:

1. Push the desired branch to GitHub.
2. Open the repository **Settings**.
3. Select **Pages** under **Code and automation**.
4. Choose the deployment branch and `/ (root)` folder.
5. Save the settings.

GitHub Pages may take a few minutes to publish or update the site.

## Project Structure

```text
TechBit/
├── index.html                  # Home page
├── shop.html                   # Product catalog
├── product.html                # Product detail page
├── cart.html                   # Shopping cart
├── contact.html                # Contact page
├── style.css                   # Website styles
├── products.js                 # Central product catalog
├── script.js                   # Shared cart and rendering logic
├── images/                     # Logos and product images
├── DOCUMENTATION.md            # Detailed implementation documentation
├── IMAGES.md                   # Image-related notes
└── legacy-routes/              # Redirects for former routes
```

## Demo Limitations

This repository is a front-end demonstration. It does not yet include:

- Real payments or a checkout backend
- Order processing or order history
- User authentication and account management
- Inventory synchronization
- Server-side search
- Persistent carts across devices
- Backend contact-message storage

A real production store would need a backend, database, authentication, payment integration, and server-side validation.

## Documentation

Additional implementation notes are available in:

- [`DOCUMENTATION.md`](DOCUMENTATION.md)
- [`IMAGES.md`](IMAGES.md)

## Contributing

1. Create or switch to a feature branch.
2. Make focused changes and test every affected page in a browser.
3. Verify responsive behavior at desktop and mobile widths.
4. Confirm product IDs and category names remain consistent.
5. Open a pull request against the intended target branch.

## License

No license has been specified for this repository. Add a license before using or distributing the project beyond its original scope.

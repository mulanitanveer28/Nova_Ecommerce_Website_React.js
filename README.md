# Nova — React ecommerce storefront

A responsive React + Vite storefront with Home, Shop, Collections, Sale, Deals, product details, search, category filtering, sorting, wishlist, cart, demo checkout, login and sign-up.

## Run locally

1. Install Node.js 18 or newer.
2. Open a terminal in this folder.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed by Vite (usually http://localhost:5173).

## Included functionality

- React Router navigation for all storefront pages.
- Product search, category filtering and price/name sorting.
- Add-to-cart, quantity updates, remove items and subtotal calculation.
- Wishlist toggle and saved-items page.
- Demo account sign-in/sign-up stored in browser localStorage.
- Demo checkout form. It does not process payments or create real orders.
- Cart, wishlist and demo account persist in localStorage.
- Responsive layouts, hover transitions, hero zoom and reduced-motion support.

## Customize

- Edit products and category imagery in `src/data.js`.
- Change styles in `src/styles.css`.
- Replace the demo checkout/authentication with a secure backend before production.

Product imagery is loaded from Unsplash and Google Fonts are loaded remotely, so those assets need an internet connection.


### Currency
All product prices, discounts, cart totals and checkout totals are displayed in Indian Rupees (INR) using the ₹ symbol and Indian number grouping. Product prices are sample INR storefront prices and can be edited in `src/data.js`.


// Basic product data (replace with your catalog or API)
const products = [
  { id: 1, title: 'Core Tee — Black', price: 24.00, image: 'assets/images/product-tee-black.jpg' },
  { id: 2, title: 'Core Tee — White', price: 24.00, image: 'assets/images/product-tee-white.jpg' },
  { id: 3, title: 'Heavy Hoodie — Coal', price: 59.00, image: 'assets/images/product-hoodie-coal.jpg' },
  { id: 4, title: 'Relaxed Sweatpant — Ash', price: 49.00, image: 'assets/images/product-sweatpant-ash.jpg' },
  { id: 5, title: 'Ball Cap — Forest', price: 29.00, image: 'assets/images/product-cap-forest.jpg' },
  { id: 6, title: 'Canvas Tote — Natural', price: 19.00, image: 'assets/images/product-tote-natural.jpg' },
  { id: 7, title: 'Crewneck — Navy', price: 54.00, image: 'assets/images/product-crew-navy.jpg' },
  { id: 8, title: 'Active Short — Charcoal', price: 39.00, image: 'assets/images/product-short-charcoal.jpg' },
];

// Render products
function renderProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="body">
        <div class="title">${p.title}</div>
        <div class="price">$${p.price.toFixed(2)}</div>
        <div class="actions">
          <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
          <button class="btn icon" aria-label="Add to wishlist">♡</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Cart state
const cartState = {
  items: [],
};

function toggleCart() {
  const cart = document.getElementById('cart');
  cart.classList.toggle('open');
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cartState.items.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cartState.items.push({ id: product.id, title: product.title, price: product.price, image: product.image, qty: 1 });
  }
  updateCartUI();
  toggleCart();
}

function removeFromCart(productId) {
  cartState.items = cartState.items.filter(i => i.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const itemsEl = document.getElementById('cart-items');
  const countEl = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total');

  itemsEl.innerHTML = '';
  let total = 0;
  cartState.items.forEach(i => {
    total += i.price * i.qty;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${i.image}" alt="${i.title}">
      <div>
        <div class="title">${i.title}</div>
        <div class="small">Qty: ${i.qty} · $${i.price.toFixed(2)}</div>
      </div>
      <button class="btn icon" onclick="removeFromCart(${i.id})">✕</button>
    `;
    itemsEl.appendChild(row);
  });

  countEl.textContent = cartState.items.reduce((sum, i) => sum + i.qty, 0);
  totalEl.textContent = `$${total.toFixed(2)}`;
}

function checkout() {
  alert('This is a demo. Connect your payment provider (Stripe/PayPal) to accept payments.');
}

// Newsletter
function subscribe(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('newsletter-msg');
  if (!email) return;
  // For production: send email to your backend or ESP (Mailchimp, Brevo, etc.)
  msg.textContent = 'Thanks! Check your inbox to confirm.';
}

// Utilities
function setYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

renderProducts();
setYear();

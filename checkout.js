// Prevent right click & copy
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's')) {
    e.preventDefault();
  }
});

// Cart logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutForm = document.getElementById('checkoutForm');

function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `<li class='flex justify-between'>
      <span>${item.name} x ${item.qty}</span>
      <span>Rp${item.price * item.qty}</span>
      <button onclick="removeItem(${index})" class='text-red-500'>❌</button>
    </li>`;
  });
  cartTotal.textContent = total.toLocaleString();
  cartCount.textContent = cart.length;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

document.querySelectorAll('.addToCart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    renderCart();
  });
});

cartBtn.addEventListener('click', () => cartModal.classList.remove('hidden'));
closeCart.addEventListener('click', () => cartModal.classList.add('hidden'));

checkoutBtn.addEventListener('click', () => {
  cartModal.classList.add('hidden');
  checkoutModal.classList.remove('hidden');
});

checkoutForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('custName').value;
  const phone = document.getElementById('custPhone').value;
  const address = document.getElementById('custAddress').value;
  let order = 'Halo, saya ingin pesan:%0A';
  cart.forEach(item => {
    order += `- ${item.name} x ${item.qty} (Rp${item.price * item.qty})%0A`;
  });
  order += `%0ATotal: Rp${cart.reduce((a,b) => a + (b.price*b.qty), 0)}%0A%0AData Pengiriman:%0ANama: ${name}%0ANo HP: ${phone}%0AAlamat: ${address}`;
  window.open(`https://wa.me/6281234567890?text=${order}`, '_blank');
});

renderCart();

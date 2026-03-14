const products = [
  { id: 1, name: "Paracetamol", price: 500 },
  { id: 2, name: "Amoxicillin", price: 1500 },
  { id: 3, name: "Vitamin C", price: 800 },
  { id: 4, name: "Cough Syrup", price: 1200 },
  { id: 5, name: "Ibu400", price: 500},
  { id: 5, name: "Vitamin E", price: 300},
  { id: 5, name: "ProCold", price: 450},
  { id: 5, name: "CoffMix Syrup", price: 700}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
  const productList = document.getElementById("product-list");

  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>₦${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(div);
  });
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  render();
}


function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("cart-count");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₦${item.price}
      <button onclick="removeItem(${index})">X</button>
    `;

    cartItems.appendChild(li);
  });

  totalEl.textContent = total;
  countEl.textContent = cart.length;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function checkout() {
  alert("Order placed successfully!");
  cart = [];
  localStorage.removeItem("cart");
  updateCart();
}


document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Message sent successfully!");
});

function toggleDark() {
  document.body.classList.toggle("dark");
}

displayProducts();
updateCart();
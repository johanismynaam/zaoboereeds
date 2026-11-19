let basket = [];

function renderProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = PRODUCTS.map(function (p) {
    return (
      '<article class="card">' +
        '<h3>' + p.name + '</h3>' +
        '<p class="card-desc">' + p.description + '</p>' +
        '<p class="card-price">R' + p.price.toFixed(2) + ' each</p>' +
        '<p class="card-strengths">Strengths: ' + p.strengths.join(", ") + '</p>' +
        '<button type="button" class="btn btn-secondary" data-select="' + p.id + '">Order this reed</button>' +
      '</article>'
    );
  }).join("");

  grid.querySelectorAll("[data-select]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.getElementById("reed-type").value = btn.getAttribute("data-select");
      populateStrengths();
      document.getElementById("order").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function populateReedTypeOptions() {
  const select = document.getElementById("reed-type");
  select.innerHTML = PRODUCTS.map(function (p) {
    return '<option value="' + p.id + '">' + p.name + ' (R' + p.price.toFixed(2) + ')</option>';
  }).join("");
  populateStrengths();
}

function populateStrengths() {
  const select = document.getElementById("reed-type");
  const strengthSelect = document.getElementById("strength");
  const product = PRODUCTS.find(function (p) { return p.id === select.value; });
  strengthSelect.innerHTML = product.strengths
    .map(function (s) { return '<option value="' + s + '">' + s + '</option>'; })
    .join("");
}

function populateWiringOptions() {
  const select = document.getElementById("wiring");
  select.innerHTML = WIRING_OPTIONS
    .map(function (w) { return '<option value="' + w + '">' + w + '</option>'; })
    .join("");
}

function populateShippingOptions() {
  const select = document.getElementById("shipping-method");
  select.innerHTML = SHIPPING_OPTIONS.map(function (opt) {
    const feeLabel = opt.fee > 0 ? " (R" + opt.fee.toFixed(2) + ")" : " (Free)";
    return '<option value="' + opt.id + '">' + opt.label + feeLabel + '</option>';
  }).join("");
}

function populatePaymentOptions() {
  const select = document.getElementById("payment-method");
  select.innerHTML = PAYMENT_OPTIONS
    .map(function (p) { return '<option value="' + p.id + '">' + p.label + '</option>'; })
    .join("");
}

function addItemToBasket() {
  const typeSelect = document.getElementById("reed-type");
  const strengthSelect = document.getElementById("strength");
  const wiringSelect = document.getElementById("wiring");
  const qtyInput = document.getElementById("quantity");

  const product = PRODUCTS.find(function (p) { return p.id === typeSelect.value; });
  const strength = strengthSelect.value;
  const wiring = wiringSelect.value;
  const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);

  const existing = basket.find(function (item) {
    return item.productId === product.id && item.strength === strength && item.wiring === wiring;
  });

  if (existing) {
    existing.qty += qty;
  } else {
    basket.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      strength: strength,
      wiring: wiring,
      qty: qty
    });
  }

  qtyInput.value = 1;
  renderBasket();
}

function removeItemFromBasket(index) {
  basket.splice(index, 1);
  renderBasket();
}

function renderBasket() {
  const list = document.getElementById("basket-list");
  const emptyNote = document.getElementById("basket-empty");

  if (basket.length === 0) {
    list.innerHTML = "";
    emptyNote.style.display = "block";
    updateTotal();
    return;
  }

  emptyNote.style.display = "none";

  list.innerHTML = basket.map(function (item, index) {
    const lineTotal = item.price * item.qty;
    return (
      '<div class="basket-item">' +
        '<div class="basket-item-details">' +
          '<strong>' + item.qty + 'x ' + item.name + '</strong>' +
          '<span>' + item.strength + ' &middot; ' + item.wiring + '</span>' +
        '</div>' +
        '<div class="basket-item-price">R' + lineTotal.toFixed(2) + '</div>' +
        '<button type="button" class="btn-remove" data-index="' + index + '" aria-label="Remove">&times;</button>' +
      '</div>'
    );
  }).join("");

  list.querySelectorAll("[data-index]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      removeItemFromBasket(parseInt(btn.getAttribute("data-index"), 10));
    });
  });

  updateTotal();
}

function getBasketSubtotal() {
  return basket.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
}

function updateTotal() {
  const shippingSelect = document.getElementById("shipping-method");
  const paymentSelect = document.getElementById("payment-method");

  const shippingOption = SHIPPING_OPTIONS.find(function (s) { return s.id === shippingSelect.value; }) || SHIPPING_OPTIONS[0];
  const isCash = paymentSelect.value === "cash";

  const subtotal = getBasketSubtotal();
  const discount = isCash ? subtotal * CASH_DISCOUNT_RATE : 0;
  const total = subtotal - discount + shippingOption.fee;

  document.getElementById("summary-subtotal").textContent = "R" + subtotal.toFixed(2);
  document.getElementById("summary-discount").textContent = "-R" + discount.toFixed(2);
  document.getElementById("summary-discount-row").style.display = isCash ? "flex" : "none";
  document.getElementById("summary-shipping").textContent = shippingOption.fee > 0 ? "R" + shippingOption.fee.toFixed(2) : "Free";
  document.getElementById("summary-total").textContent = "R" + total.toFixed(2);
}

function buildOrderItemsText() {
  return basket.map(function (item) {
    const lineTotal = item.price * item.qty;
    return item.qty + "x " + item.name + " (" + item.strength + ", " + item.wiring + ") - R" + lineTotal.toFixed(2);
  }).join("\n");
}

function handleFormSubmit(event) {
  if (basket.length === 0) {
    event.preventDefault();
    alert("Please add at least one reed to your order before submitting.");
    return;
  }

  const shippingSelect = document.getElementById("shipping-method");
  const paymentSelect = document.getElementById("payment-method");
  const shippingOption = SHIPPING_OPTIONS.find(function (s) { return s.id === shippingSelect.value; }) || SHIPPING_OPTIONS[0];
  const isCash = paymentSelect.value === "cash";

  const subtotal = getBasketSubtotal();
  const discount = isCash ? subtotal * CASH_DISCOUNT_RATE : 0;
  const total = subtotal - discount + shippingOption.fee;

  document.getElementById("order-items-field").value = buildOrderItemsText();
  document.getElementById("order-subtotal-field").value = "R" + subtotal.toFixed(2);
  document.getElementById("order-discount-field").value = "R" + discount.toFixed(2);
  document.getElementById("order-shipping-field").value = shippingOption.fee > 0 ? "R" + shippingOption.fee.toFixed(2) : "Free";
  document.getElementById("order-total-field").value = "R" + total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  renderProducts();
  populateReedTypeOptions();
  populateWiringOptions();
  populateShippingOptions();
  populatePaymentOptions();
  renderBasket();

  document.getElementById("reed-type").addEventListener("change", populateStrengths);
  document.getElementById("add-item-btn").addEventListener("click", addItemToBasket);
  document.getElementById("shipping-method").addEventListener("change", updateTotal);
  document.getElementById("payment-method").addEventListener("change", updateTotal);
  document.getElementById("order-form").addEventListener("submit", handleFormSubmit);
});

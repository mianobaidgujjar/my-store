/* ---------- Helper ---------- */
  function getStorageKey() { return "products"; }

  function loadProducts() {
    const raw = localStorage.getItem(getStorageKey());
    return raw ? JSON.parse(raw) : [];
  }

  function saveProducts(products) {
    localStorage.setItem(getStorageKey(), JSON.stringify(products));
  }

  /* ---------- Storefront rendering ---------- */
  function renderProducts() {
    const container = document.getElementById("products");
    container.innerHTML = "";                                     // clear
    const products = loadProducts();

    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h2>${p.name}</h2>
        <p>${p.category}</p>
        <p class="price">$${p.price.toFixed(2)}</p>
        <p>${p.description}</p>
      `;
      container.appendChild(div);
    });
  }

  /* ---------- Admin actions ---------- */
  document.getElementById("productForm").addEventListener("submit", e => {
    e.preventDefault();

    // Grab values
    const form = e.target;
    const product = {
      name:          form.name.value.trim(),
      description:   form.description.value.trim(),
      price:         parseFloat(form.price.value),
      category:      form.category.value.trim(),
      image:         form.image.value.trim(),
      // Store the meta description too (same as description for simplicity)
      meta:          form.description.value.trim()
    };

    // Load, push, save
    const products = loadProducts();
    products.push(product);
    saveProducts(products);

    alert("✅ Product saved!");
    // Optional: redirect to storefront to see the new item
    // window.location.href = "index.html";
  });

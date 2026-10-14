const API_URL = 'https://dummyjson.com/products?limit=100'; 
let allProducts = [];
let currentPage = 1;
let itemsPerPage = 10;

const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const productGrid = document.getElementById('product-grid');
const paginationNav = document.getElementById('pagination-nav');
const limitSelect = document.getElementById('limit-select');
const analyticsContent = document.getElementById('analytics-content');
const themeToggleBtn = document.getElementById('theme-toggle');

async function loadProducts() {
    try {
        loadingState.classList.remove('hidden');
        errorState.classList.add('hidden');

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        allProducts = data.products;

        renderAnalytics(allProducts);
    
        renderPaginatedProducts();

    } catch (error) {
        errorState.textContent = `Gagal memuat data: ${error.message}. Periksa koneksi internet Anda.`;
        errorState.classList.remove('hidden');
    } finally {
        loadingState.classList.add('hidden');
    }
}

function renderAnalytics(products) {
    if (products.length === 0) return;

    const totalHarga = products.reduce((acc, curr) => acc + curr.price, 0);
    const rataRataHarga = (totalHarga / products.length).toFixed(2);

    const produkTermahal = products.reduce((prev, curr) => (prev.price > curr.price) ? prev : curr);

    const kategoriUnik = [...new Set(products.map(p => p.category))];

    analyticsContent.innerHTML = `
        <div class="metric-box">
            <p><strong>Rata-rata Harga:</strong></p>
            <p>$${rataRataHarga}</p>
        </div>
        <div class="metric-box">
            <p><strong>Produk Termahal:</strong></p>
            <p>${produkTermahal.title} ($${produkTermahal.price})</p>
        </div>
        <div class="metric-box">
            <p><strong>Jumlah Kategori:</strong></p>
            <p>${kategoriUnik.length} Kategori</p>
        </div>
    `;
}

function renderPaginatedProducts() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = allProducts.slice(startIndex, endIndex);

    productGrid.innerHTML = '';
    paginatedItems.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Harga: $${product.price}</p>
            <p><small>Kategori: ${product.category}</small></p>
        `;
        productGrid.appendChild(card);
    });

    renderPaginationControls();
}

function renderPaginationControls() {
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    paginationNav.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === currentPage) btn.className = 'active';
        btn.addEventListener('click', () => {
            currentPage = i;
            renderPaginatedProducts();
        });
        paginationNav.appendChild(btn);
    }
}

limitSelect.addEventListener('change', (e) => {
    itemsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderPaginatedProducts();
});

const partnerForm = document.getElementById('partner-form');
const emailInput = document.getElementById('email');
const confirmEmailInput = document.getElementById('confirm-email');
const errorEmail = document.getElementById('error-email');
const errorConfirmEmail = document.getElementById('error-confirm-email');
const formSuccess = document.getElementById('form-success');

partnerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    errorEmail.textContent = '';
    errorConfirmEmail.textContent = '';
    formSuccess.classList.add('hidden');

    const emailValue = emailInput.value.trim();
    const confirmEmailValue = confirmEmailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
        errorEmail.textContent = 'Email tidak boleh kosong.';
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        errorEmail.textContent = 'Format email tidak valid.';
        isValid = false;
    }

    if (!confirmEmailValue) {
        errorConfirmEmail.textContent = 'Konfirmasi email tidak boleh kosong.';
        isValid = false;
    } else if (emailValue !== confirmEmailValue) {
        errorConfirmEmail.textContent = 'Konfirmasi email tidak sama dengan email utama.';
        isValid = false;
    }

    if (isValid) {
        formSuccess.classList.remove('hidden');
        partnerForm.reset();
    }
});

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = '☀️ Light Mode';
}

themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙 Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️ Light Mode';
    }
});

loadProducts();
let products = [];
let filtered = [];
let currentPage = 1;
let pageSize = 10;

/* ======================
   GET ALL
====================== */
async function getAll() {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    products = await res.json();
    filtered = [...products];
    render();
}

/* ======================
   RENDER
====================== */
function render() {
    const tbody = document.getElementById("table-body");
    tbody.innerHTML = "";

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const pageData = filtered.slice(start, end);

    pageData.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td><img src="${p.images[0]}"></td>
                <td>${p.title}</td>
                <td>$${p.price}</td>
                <td>${p.category.name}</td>
            </tr>
        `;
    });

    renderPagination();
}

/* ======================
   PAGINATION
====================== */
function renderPagination() {
    const totalPage = Math.ceil(filtered.length / pageSize);
    const div = document.getElementById("pagination");
    div.innerHTML = "";

    for (let i = 1; i <= totalPage; i++) {
        div.innerHTML += `<button onclick="goPage(${i})">${i}</button>`;
    }
}

function goPage(p) {
    currentPage = p;
    render();
}

/* ======================
   SEARCH onChange
====================== */
document.getElementById("search").addEventListener("input", e => {
    const key = e.target.value.toLowerCase();
    filtered = products.filter(p =>
        p.title.toLowerCase().includes(key)
    );
    currentPage = 1;
    render();
});

/* ======================
   PAGE SIZE
====================== */
document.getElementById("pageSize").addEventListener("change", e => {
    pageSize = Number(e.target.value);
    currentPage = 1;
    render();
});

/* ======================
   SORT
====================== */
function sortPriceAsc() {
    filtered.sort((a, b) => a.price - b.price);
    render();
}

function sortPriceDesc() {
    filtered.sort((a, b) => b.price - a.price);
    render();
}

function sortNameAsc() {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
    render();
}

function sortNameDesc() {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
    render();
}

getAll();

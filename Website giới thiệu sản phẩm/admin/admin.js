// admin.js

let products = JSON.parse(localStorage.getItem('products')) || [];

function showAddProductForm() {
    document.getElementById('productId').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productSpecs').value = '';
    document.getElementById('productBrand').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('formTitle').innerText = 'Thêm sản phẩm';
    document.getElementById('productFormContainer').style.display = 'block';
}

function showEditProductForm(index) {
    const product = products[index];
    document.getElementById('productId').value = index;
    document.getElementById('productImage').value = '';
    document.getElementById('productName').value = product.name;
    document.getElementById('productSpecs').value = product.specs;
    document.getElementById('productBrand').value = product.brand;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('formTitle').innerText = 'Sửa sản phẩm';
    document.getElementById('productFormContainer').style.display = 'block';
}

function hideProductForm() {
    document.getElementById('productFormContainer').style.display = 'none';
}

function submitProductForm(event) {
    event.preventDefault();
    const id = document.getElementById('productId').value;
    const image = document.getElementById('productImage').files[0];
    const name = document.getElementById('productName').value;
    const specs = document.getElementById('productSpecs').value;
    const brand = document.getElementById('productBrand').value;
    const price = document.getElementById('productPrice').value;

    const reader = new FileReader();
    reader.onload = function(event) {
        const product = {
            image: event.target.result,
            name,
            specs,
            brand,
            price
        };

        if (id) {
            products[id] = product;
        } else {
            products.push(product);
        }

        localStorage.setItem('products', JSON.stringify(products));
        renderProductTable();
        hideProductForm();
    };
    reader.readAsDataURL(image);
}

function renderProductTable() {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
            <td>${product.name}</td>
            <td>${product.specs}</td>
            <td>${product.brand}</td>
            <td>${product.price}đ</td>
            <td>
                <button onclick="showEditProductForm(${index})">Sửa</button>
                <button onclick="deleteProduct(${index})">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProductTable();
}

// Render the product table on initial load
renderProductTable();

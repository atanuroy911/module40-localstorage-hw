var productCount = 0;
const getLocalStorageProduct = (name) => {
    const products = localStorage.getItem(name);
    const productObj = products ? JSON.parse(products) : {}
    return productObj;
}

const addProduct = () => {
    const productNameField = document.getElementById('product-name');
    const productName = productNameField.value;
    const productPriceField = document.getElementById('product-price');
    const productPrice = productPriceField.value;
    
    if (!(productName || productPrice)) {
        alert('No Values Input');
        return;
    }
    
    displayProducts(productName, productPrice);

    addProductToLocalStorage(productName, productPrice);

}

const addProductToLocalStorage = (name, price) => {
    const products = getLocalStorageProduct('products');
    if(products[name]){
        if (confirm('Product exists. Update Price ?')){
            products[name] = price;
        }
    }
    else {
        products[name] = price;
    }
    const productsStringified = JSON.stringify(products);
    localStorage.setItem('products', productsStringified);
}

const displayLocalProducts = () => {
    const products = getLocalStorageProduct('products');
    for (const product in products) {
        if (Object.hasOwnProperty.call(products, product)) {
            displayProducts(product, products[product], products.length);
        }
    }
}

const displayProducts = (name, price) => {
    productCount++;
    const productTableBody = document.getElementById('product-table-body');
    const tableElement = document.createElement('tr');
    tableElement.innerHTML = `
    <th scope="row">${productCount}</th>
    <td>${name}</td>
    <td>${price}</td>
    `;
    productTableBody.appendChild(tableElement);

}

displayLocalProducts();

document.getElementById('submit-btn').addEventListener('click', addProduct)
const insertProduct = (insertInto, data) => {
    const product_item_HTML = `                
    <div class="product-img-content">
        <div class="product-img img-div zoom-img-div">
            <a href="../HTML/single_product.html?id=${data._id}"><img src="${data.image}" alt="" width="800"
                    height="1024"></a>
        </div>
        <div class="product-funcs">
            <a href="#" class="product-func-icon">
                <img src="../img/Icons/plus.svg" alt="Plus">
            </a>
            <a href="#" class="product-func-icon center-icon eye-icon" id="${data._id}">
                <img src="../img/Icons/eye.svg" alt="See">
            </a>
            <a href="#" class="product-func-icon">
                <img src="../img/Icons/heart.svg" alt="Like">
            </a>
        </div>
    </div>
    <div class="product-desc">
        <a href="../HTML/products.html?categories=${data.category[0]}" class="cat-text font2">${data.category[0]}</a>
        <a href="../HTML/single_product.html?id=${data._id}" class="name-text font2">${data.name}</a>
        <a href="#" class="price-text font2">$${data.price}</a>
    </div>
    `;
    const productItem = document.createElement('div');
    productItem.classList = "product-item";
    productItem.innerHTML += product_item_HTML;

    insertInto.appendChild(productItem);

}

const insertSmallProds = (insertInto, data) => {

    var prod_opt_HTML = `

    <div class="prod-opt-img img-div">
        <a href="./HTML/single_product.html?id=${data._id}"></a><img src="${data.image}" alt="" width="100"
            height="108"></a>
    </div>
    <div class="prod-opt-desc">
        <a href="./HTML/single_product.html?id=${data._id}" class="td-none">
            <h3 class="prod-opt-name pink-hover">
            ${data.name} &nbsp &nbsp &nbsp $${data.price}
            </h3>
        </a>
        <a href="" class="td-none">
            <h4 class="prod-opt-cat">
                ${data.category.toString()}
            </h4>
        </a>
    </div>

    `;
    const productItem = document.createElement('div');
    productItem.classList = "prod-opt-single-prod";
    productItem.innerHTML += prod_opt_HTML;

    insertInto.appendChild(productItem);    
}
export { insertProduct, insertSmallProds };
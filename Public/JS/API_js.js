import { insertProduct, insertSmallProds } from "./insertProd.js";
const getAPIdata = async (url) => {
    try {
        const response = await fetch(url)
        return await response.json();

    }
    catch (error) {
        console.log(error);
    }
}

const insertData = (insertInto, promise, toShow, insertionFunction) => {
    let i = 0;
    promise.then((allProducts) => {

        for (let eachProduct of allProducts.products) {

            if (i == toShow) {
                break;
            }

            insertionFunction(insertInto, eachProduct);
            i++;
        }
    })
}

const new_products_home = document.getElementById('new-products-home'); // for home page

if (new_products_home) {
    insertData(new_products_home, getAPIdata('/api/v1/products'), 4, insertProduct);
}

const featured = document.getElementById('featured');
const sale = document.getElementById('sale');

if (featured) {
    insertData(featured, getAPIdata('/api/v1/products?featured=true'), 3, insertSmallProds);
}

if (sale) {
    insertData(sale, getAPIdata('/api/v1/products?sale=true'), 3, insertSmallProds);
}

// products html
const all_products_container = document.getElementById('all-products-container') // for products page

if (all_products_container) {

    let productItems = 12;

    const params = window.location.search;

    let apiURL = `/api/v1/products${params}`;

    insertData(all_products_container, getAPIdata(apiURL), productItems, insertProduct);
    all_products_container.scrollIntoView();

    const min_price = document.getElementById('min-price');
    const max_price = document.getElementById('max-price');
    const filter_btn = document.getElementById('price-submit');

    getAPIdata('/api/v1/products?fields=price&sort=-price&limit=1').then((product) => { // to get max price 
        max_price.value = product.products[0].price;
    })
    getAPIdata('/api/v1/products?fields=price&sort=price&limit=1').then((product) => { // to get min price
        min_price.value = product.products[0].price;
    })

    filter_btn.addEventListener('click', (event) => {
        event.preventDefault();
        let from = min_price.value;
        let to = max_price.value;
        apiURL = `/api/v1/products?numericFilters=price>=${from},price<=${to}`;

        all_products_container.innerHTML = ``;

        insertData(all_products_container, getAPIdata(apiURL), productItems, insertProduct);
        all_products_container.scrollIntoView();
    })

}

//__________________________Single Product stuff_________________________________________________
const related_product_items_single = document.getElementById('related-product-items-single'); // for single page
const more_product_items_single = document.getElementById('more-product-items-single'); // for single page

let relURL = `/api/v1/products`;

const single_page = document.getElementById('single-page');

if (single_page) { // ? if single_product.html exists
    const small_imgs = document.getElementById('small-imgs');
    const single_product_big_img = document.getElementById('single-product-big-img');
    const single_product_name = document.getElementById('single-product-name');
    const single_product_price = document.getElementById('single-product-price');
    const single_product_rating = document.getElementById('single-product-rating');
    const single_product_desc = document.getElementById('single-product-desc');
    const single_product_sku = document.getElementById('single-product-sku');
    const single_product_categories = document.getElementById('single-product-categories');
    const single_product_tags = document.getElementById('single-product-tags');

    const productID = new URLSearchParams(window.location.search).get('id');

    getAPIdata(`/api/v1/products/${productID}`).then((singleProduct) => {
        let productObj = singleProduct.product;

        let cats = productObj.category.toString()

        single_product_big_img.src = productObj.image;

        single_product_name.innerText = productObj.name;
        single_product_price.innerText = `$${productObj.price}`;
        single_product_desc.innerText = productObj.description;
        single_product_sku.innerText = productObj.otherInfo.sku;
        single_product_categories.innerText = cats;

        single_product_categories.href = `../HTML/products.html?categories=${productObj.category.toString()}`;
        single_product_tags.innerText = productObj.tags.toString();

        single_product_rating.classList += ` star-${productObj.rating}`;

        productObj.small_Images.forEach(imgPath => {

            let small_img = document.createElement('div');
            small_img.setAttribute('class', 'small-img img-div');

            let small_imgIMG = document.createElement('img');
            small_imgIMG.setAttribute('width', "600")
            small_imgIMG.setAttribute('height', "768")

            small_imgIMG.setAttribute('src', imgPath)
            small_img.appendChild(small_imgIMG)

            // appending the whole div to small_imgs div
            small_imgs.appendChild(small_img);
        });

        relURL += `?categories=${cats.split(',')[0]}&numericFilters=_id!=${productID}`;

        if (related_product_items_single) {
            insertData(related_product_items_single, getAPIdata(relURL), 4, insertProduct);
        }

        if (more_product_items_single) {
            insertData(more_product_items_single, getAPIdata('/api/v1/products'), 6, insertProduct);
        }
    })
}

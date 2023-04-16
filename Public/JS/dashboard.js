// creating the post request
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json();
}


// ____________________________temporary for dashboard_________________________

const submit_product = document.getElementById('product-submit');

let product_image = document.getElementById('product-image')
let product_img = document.getElementById('product-img')

let product_small_images = document.getElementById('product-small-images')
let product_small_imgs = document.getElementById('product-small-imgs')

product_image.addEventListener('change', function () {

    let rep = product_image.value.replaceAll('\\', '/');
    let pathInd = rep.lastIndexOf('/');
    rep = rep.substr(11, rep.length + 1);
    product_img.value = rep;
})

// product_small_images.addEventListener('change', function () {

//     // product_small_images.files.forEach((element)=>{
//     //     product_small_imgs.value += element + ","
//     // })
//     let allFiles = product_small_images.files

// })

submit_product.addEventListener('click', (e) => {
    e.preventDefault();

    let name = document.getElementById('product-name').value
    let price = document.getElementById('product-price').value
    let description = document.getElementById('product-desc').value
    let categoryString = document.getElementById('product-categories').value
    let tagsString = document.getElementById('product-tags').value
    let inventory = document.getElementById('product-inventory').value
    let rating = document.getElementById('product-rating').value
    let featured = document.getElementById('product-featured').checked
    let sale = document.getElementById('product-sale').checked

    price = Number(price);
    if (inventory) {
        inventory = Number(inventory);
    }
    else {
        inventory = Number(10)
    }
    if (rating) {
        rating = Number(rating);
    }
    else {
        rating = Number(5)
    }
    category = categoryString.split(',');
    if (tagsString) {
        tags = tagsString.split(',');
    }
    else{
        tags = category
    }
    image = product_img.value;

    postData('/api/v1/products', {name, price, description, image, category, tags, inventory, rating, featured, sale})
        .then(data => {
            if (data.success) {
                alert(`${data.msg}`);
            }
            else {
                alert(`${data.msg}`);
            }
        });

})  

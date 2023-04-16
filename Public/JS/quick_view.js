setTimeout(() => {
    console.log("quick");

    const getAPIdata = async (url) => {
        try {
            const response = await fetch(url)
            return await response.json();

        }
        catch (error) {
            console.log(error);
        }
    }

    // getting the quick-view card, variables
    var quickView = document.getElementsByClassName('quick-view')[0];
    var quick_name = document.getElementById('quick-name')
    var quick_img = document.getElementById('quick-img')
    var quick_price = document.getElementById('quick-price')
    var quick_desc = document.getElementById('quick-desc')

    // opening quick view whenever user clicks on eye button

    const all_product_items = document.getElementsByClassName('add-quick-view')[0]; // getting all product items

    // getting all the eyes icons from all_product-items
    var all_eyeIcons = all_product_items.getElementsByClassName('eye-icon');
    var star_rating = document.getElementsByClassName('star-rating')[0];

    for (let each_eyeIcon of all_eyeIcons) {
        each_eyeIcon.addEventListener('click', function (e) {
            e.preventDefault();

            // getting the details about the item clicked
            getAPIdata(`/api/v1/products/${this.id}`)
                .then((clicked_product) => {
                    quick_name.innerText = clicked_product.product.name;
                    quick_desc.innerText = clicked_product.product.description;
                    quick_price.innerText = `$${clicked_product.product.price}`;
                    quick_img.src = clicked_product.product.image;
                    star_rating.classList = `star-rating star-${clicked_product.product.rating}`;
                })

            quickView.style.transform = "translateY(0%)";
        })
    }

    // close button for quick view
    const closeBtn = document.getElementsByClassName('close-btn')[0];


    closeBtn.addEventListener('click', () => {
        // quickView.style.display = "none";
        quickView.style.transform = "translateY(100%)";
    });

    // When the user clicks anywhere outside of the quickView, close it
    window.onclick = function (event) {
        if (event.target == quickView) {
            // quickView.style.display = "none";
            quickView.style.transform = "translateY(100%)";
        }
    }

}, 1000);
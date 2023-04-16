// getting the active nav-items and changing when we click on them
// getting the container element, ul
const nav_ul = document.getElementById('nav-items-ul');

// getting all the anchor tags from our ul
const nav_anchors = nav_ul.getElementsByTagName('a');

var active_class = 'nav-active';

for (let each_anchor of nav_anchors) { // getting each anchors from group of anchors
    each_anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var current_active = document.getElementsByClassName(active_class);
        current_active[0].className = current_active[0].className.replace(active_class, "");

        this.className += " " + active_class;
        window.location.href = this.href;
    });
}


// *_______________________________code for working the theme button
const themeBtn = document.getElementById('theme-img');

themeBtn.addEventListener('click', () => {

    let element = document.body;
    // toggle will add and remove the class whenever the button is clicked
    element.classList.toggle('girl-theme');

});

// *___________________________________code for quantity picker___________

const counter = function () {

    const quantiy_input = document.getElementById('quantity'); // getting the quantity from input box
    const minusBtn = document.getElementById('minus-btn');
    const plusBtn = document.getElementById('plus-btn');

    if (quantiy_input && minusBtn && plusBtn) {
        var quantity = parseInt(quantiy_input.value); // converting the input value (string) to int

        plusBtn.addEventListener('click', () => {
            quantity += 1;
            quantiy_input.value = quantity;
        });

        minusBtn.addEventListener('click', () => {
            if (quantity != 1) { // if quantity is already one, dont need to decrement it
                quantity -= 1;
                quantiy_input.value = quantity;
            }
        });

    }
}
counter()

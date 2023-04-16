// getting the active wrapper items and opening and hiding the divs accordingly, like of description shipping etc..

const wrap_aTags_and_Content = {
    "wrap-desc": "description-content", // nav-items id and corresponding div id to open
    "wrap-ship": "shipping-content",
    "wrap-info": "additional-content",
    "wrap-reviews": "reviews-content",
    "wrap-vendor": "vendor-content",
    "wrap-location": "location-content",
    "wrap-products": "more-products-content",
    "wrap-enquiry": "enquiry-content",
}

const wrapUl = document.getElementById('wrapper-nav-ul'); // getting the ul container

const wrapUl_aTags = wrapUl.getElementsByTagName('a'); // getting all the aTags

var active_className = 'wrap-active';

for(let each_wrap_aTag of wrapUl_aTags){
    each_wrap_aTag.addEventListener('click', function(e){ // this. not work in arrow functions

        e.preventDefault(); // prevent page reload
        //____________________________________________________getting the active tag__________________
        var current_wrap_active_aTag = document.getElementsByClassName(active_className); // getting the current active aTag tag

        //_____________________________________Doing some stuff on our current active anchor Tag________________

        // we need to do display:none of our current active nav
        var current_wrap_aTag_id = current_wrap_active_aTag[0].id; 
        
        var current_wrap_contentDiv = document.getElementById(wrap_aTags_and_Content[current_wrap_aTag_id]); // getting the corresponding content div

        current_wrap_contentDiv.style.display = "none";

        // Now removing the active class from our current wrap nav item
        current_wrap_active_aTag[0].className = current_wrap_active_aTag[0].className.replace(active_className, ""); // basically removing the active class from current active aTag

        //_______________________________________Doing some stuff on anchor tag clicked__________________________

        var clicked_wrap_aTag_id = this.id;
        var clicked_wrap_contentDiv = document.getElementById(wrap_aTags_and_Content[clicked_wrap_aTag_id]);

        clicked_wrap_contentDiv.style.display = "flex"; // making our default hidden div, visible
        
        // adding the active class name to the aTag clicked
        this.className += " " + active_className; // adding the active class to the aTag  clicked

    });
}

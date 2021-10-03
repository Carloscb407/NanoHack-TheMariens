/*!
* Start Bootstrap - Grayscale v7.0.3 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Getting Filter Data function
    var getFilterData = function () {

        const filterSelects = filterForm.querySelectorAll("select");
        const filterInput = filterForm.querySelectorAll("input");

        const orderby = document.getElementById("pref-orderby").value;
        // var recommendedValue = document.getElementById("pref-recommended").value;
        const genreValue = document.getElementById("pref-genre").value;
        const countryValue = document.getElementById("pref-country").value.toLowerCase();
        const serviceValue = document.getElementById("pref-service").value;


        const data = null;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log('raw' + this.responseText);
                const movieImg = document.getElementById("movie-poster");
                const movieTitle = document.getElementById("movieTitle");
                const movieDescription = document.getElementById("movieDescription");
                const movieRuntime = document.getElementById("movieRuntime");

                const obj = JSON.parse(this.responseText);


                if(orderby === "Ascendant") {
                    movieImg.src = obj.results[obj.results.length-1]["posterURLs"]["500"];
                    movieTitle.innerText = obj.results[obj.results.length-1]["originalTitle"];
                    movieDescription.innerText = obj.results[obj.results.length-1]["overview"];
                    movieRuntime.innerText = "Runtime: " + obj.results[obj.results.length-1]["runtime"] + "min";
                } else {
                    movieImg.src = obj.results[0]["posterURLs"]["500"];
                    movieTitle.innerText = obj.results[0]["originalTitle"];
                    movieDescription.innerText = obj.results[0]["overview"];
                    movieRuntime.innerText = "Runtime: " + obj.results[0]["runtime"] + "min";
                }


            }
        });

        xhr.open("GET", "https://streaming-availability.p.rapidapi.com/search/basic?country=" + countryValue + "&service="+ serviceValue +"&type=movie&genre="+ genreValue +"&page=1&output_language=en&language=en");
        xhr.setRequestHeader("x-rapidapi-host", "streaming-availability.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "API-KEY");

        xhr.send(data);
    };




    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const filterForm = document.getElementById('filterForm');
    const searchButton = document.getElementById('advanced-search-btn');

    searchButton.addEventListener("click", getFilterData);

});
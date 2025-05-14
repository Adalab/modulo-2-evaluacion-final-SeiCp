'use strict';

const listaUl = document.querySelector(".js-listado"); 
console.log('>> Ready :)');

let url = "https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json";

fetch (url)
.then(response =>response.json())
.then(products => {
    console.log (products)
    
    for (let product of products) {
        listaUl.innerHTML += `<li class="product-card">
        <p> ${product.title}</p>
        </li> `; 
    }

})
'use strict';

const listaUl = document.querySelector(".js-listado"); 
console.log('>> Ready :)');

const product = {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
    "rate": 3.9,
    "count": 120
    }
};

let url = "https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json";

fetch (url)
.then(response =>response.json())
.then(products => {
    console.log (products)
    
    for (let product of products) {
        let imageURL;

        if (!product.image){
            imageURL = "https://placehold.co/600x400";
        }else {
            imageURL = product.image;
        }

        listaUl.innerHTML += `<li class="product-card">
        <img src= "${product.image}" alt= ${product.title}/>
        <p> ${product.title}</p>
        <p> ${product.price}</p>
        </li>`; 
    }

})
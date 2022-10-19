// Affichage des produits du panier

// const { response } = require("express");

let params = (new URL(document.location)).searchParams;
let $id = params.get('id');

fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(products) {

        let getProduct = JSON.parse(localStorage.getItem("product"));
        let cartProduct;
        let product;
        let newTotalPrice = 0;
        let fullPrice = 0;
        let newTotalQuantity = 0;
        let fullQuantity = 0;

        for(cartProduct of getProduct) {

            for(product of products) {

                if(cartProduct.id == product._id) {

                    let selectCartItems = document.getElementById('cart__items');

                    let newArticle = document.createElement('article');
                        newArticle.classList.add('cart__item');
                        newArticle.setAttribute('data-id', cartProduct.id);
                        newArticle.setAttribute('data-color', cartProduct.color);

                    let newCartItemImg = document.createElement('div');
                        newCartItemImg.classList.add('cart__item__img');

                    let newImage = document.createElement('img');
                        newImage.setAttribute('src', product.imageUrl);
                        newImage.setAttribute('alt', product.altTxt);

                    let newCartItemContent = document.createElement('div');
                        newCartItemContent.classList.add('cart__item__content');

                    let newCartItemContentDescription = document.createElement('div');
                        newCartItemContentDescription.classList.add('cart__item__content__description');

                    let newName = document.createElement('h2');
                        newName.innerText = product.name;

                    let newColor = document.createElement('p');
                        newColor.innerText = cartProduct.color;

                    let newPrice = document.createElement('p');
                        newPrice.innerText = product.price * cartProduct.quantity + ' €';

                    let newCartItemContentSettings = document.createElement('div');
                        newCartItemContentSettings.classList.add('cart__item__content__setting');

                    let newCartItemContentSettingsQuantity = document.createElement('div');
                        newCartItemContentSettingsQuantity.classList.add('cart__item__content__setting__quantity');

                    let newQuantity = document.createElement('p');
                        newQuantity.innerText = 'Quantité : ';

                    let newItemQuantity = document.createElement('input');
                        newItemQuantity.classList.add('itemQuantity');
                        newItemQuantity.setAttribute('type', 'number');
                        newItemQuantity.setAttribute('name', 'itemQuantity');
                        newItemQuantity.setAttribute('min', '1');
                        newItemQuantity.setAttribute('max', '100');
                        newItemQuantity.setAttribute('value', cartProduct.quantity);

                    let newCartItemContentSettingsDelete = document.createElement('div');
                        newCartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');

                    let newDeleteItem = document.createElement('p');
                        newDeleteItem.classList.add('deleteItem');
                        newDeleteItem.innerText = 'Supprimer';

                    let newTotalProductQuantity = parseInt(cartProduct.quantity);

                        fullQuantity = (fullQuantity + newTotalProductQuantity);

                        newTotalQuantity = document.getElementById('totalQuantity');
                        newTotalQuantity.innerText = fullQuantity;

                    let newTotalProductPrice = product.price * cartProduct.quantity;

                        fullPrice = fullPrice + newTotalProductPrice;

                        newTotalPrice = document.getElementById('totalPrice');
                        newTotalPrice.innerText = fullPrice;

                    newArticle.append(newCartItemImg, newCartItemContent);
                    newCartItemImg.append(newImage);
                    newCartItemContent.append(newCartItemContentDescription, newCartItemContentSettings);
                    newCartItemContentDescription.append(newName, newColor, newPrice);
                    newCartItemContentSettings.append(newCartItemContentSettingsQuantity, newCartItemContentSettingsDelete);
                    newCartItemContentSettingsQuantity.append(newQuantity, newItemQuantity);
                    newCartItemContentSettingsDelete.append(newDeleteItem);
                    selectCartItems.append(newArticle);

                }
            }
        }

        // obtention de l'index de l'élément à supprimer

        let listOfItems = Array.from(document.querySelectorAll('.deleteItem'))

        for (let i =0; i<listOfItems.length; i++) {
            listOfItems[i].addEventListener('click', ((j) => {
                return function() {

                    let itemToDelete = getProduct.splice(j, 1);

                    localStorage.setItem('product', JSON.stringify(getProduct))
                }
            })(i))
        }

        let listOfQuantity =  Array.from(document.querySelectorAll('.itemQuantity'))

        let newQuantity = document.addEventListener('change', function(event) {

            newQuantity = event.target.value;

        })

        for (let i =0; i<listOfQuantity.length; i++) {
            listOfQuantity[i].addEventListener('change', ((j) => {
                return function() {

                    let newQuantity = document.addEventListener('change', function(event) {

                        newQuantity = event.target.value;
                        console.log(newQuantity)
                        console.log('ancienne valeur : ', getProduct[i])
                        getProduct[i].quantity = newQuantity;
                        let newLine = getProduct[i];
                        let itemToModify = getProduct.splice(j, 1, newLine);
                        console.log('nouvelle valeur : ', getProduct[i])
    
                        localStorage.setItem('product', JSON.stringify(getProduct)) // insère les produits avec la nouvelle quantité dans le localStorage
                        this.location.reload() // raffraichi la page à chaque changement
                    })



                }
            })(i))
        }

    })

    .catch(function(err) {
        // Une erreur est survenue
    });


//////////////////////////////////////////////////////////////////////////////////

let contact;
let form = document.querySelector('.cart__order__form');
// Obtention du prénom

form.firstName.addEventListener('change', function(event) {
        firstName = event.target.value;
        console.log(firstName);
    })

document.getElementById('firstName')
    .addEventListener('change', function(event) {
        if (/^[A-Z][A-Za-z\é\è\ê\-]+$/.test(event.target.value)) {// ^[A-Z][A-Za-z\é\è\ê\-]+$/
            contact.firstName=firstName;
        } else {
            document.getElementById('firstNameErrorMsg')
                .innerText = 'Prénom non valide';
        }
    })

// Obtention du nom de famille

form.lastName.addEventListener('change', function(event) {
        lastName = event.target.value;
        console.log(lastName);
    })

document.getElementById('lastName')
    .addEventListener('change', function(event) {
        if (/^[A-Z][A-Za-z\é\è\ê\-]+$/.test(event.target.value)) { // /^[A-Z][A-Za-z\é\è\ê\-]+$/
            contact.lastName = lastName;
        } else {
            document.getElementById('lastNameErrorMsg')
            .innerText = 'Nom non valide';
        }
    })


// Obtention de l'adresse

form.address.addEventListener('change', function(event) {
        console.log(event.target.value)
        address = event.target.value
    })

document.getElementById('address')
    .addEventListener('change', function(event) {
        if (/^[a-zA-Z0-9\s,\'-]*$/.test(event.target.value)) { // /^[a-zA-Z0-9\s,'-]*$ OU /^[a-zA-Z0-9\s,.'-]{3,}$/ . /
            contact.address = address;
        } else {
            document.getElementById('addressErrorMsg')
            .innerText = 'Adresse non valide'
        }
    })


// Obtention de la ville

form.city.addEventListener('change', function(event) {
        console.log(event.target.value)
        city = event.target.value
    })

document.getElementById('city')
    .addEventListener('change', function(event) {
        if (/^[A-Z][A-Za-z\é\è\ê\-]+$/.test(event.target.value)) { // /^[A-Z][A-Za-z\é\è\ê\-]+$/
            contact.city = city;
        } else {
            document.getElementById('cityErrorMsg')
            .innerText = 'Ville non valide';
        }
    })


// Obtention de l'adresse email

form.email.addEventListener('change', function(event) {
        console.log(event.target.value)
        email = event.target.value
    })
    document.getElementById('email')
    .addEventListener('change', function(event) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(event.target.value)) { // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            contact.email = email;
        } else {
            document.getElementById('emailErrorMsg')
            .innerText = 'Prénom non valide';
        }
    })
// form.addEventListener('submit', function(event) {
//     event.preventDefault();
//     if
// })

let listOfProducts = JSON.parse(localStorage.getItem('product')) // Affichage de la liste des produits choisis par l'utilisateur

let getOrder = document.getElementById('order')
    .addEventListener('click', (event) => {
        event.preventDefault();

        console.log(body) // Au clic, affichage des informations de l'utilisateur et la liste des produits choisis
        // localStorage.clear(); // Vide le panier

    });

const getProduct = JSON.parse(localStorage.getItem('product'))

function sendUserInfos(form) {
    const body = {
        "contact": {                            // Infos du formulaire
            "firstName": form.firstName.value,
            "lasName": form.lastName.value,
            "address": form.address.value,
            "city": form.city.value,
            "email": form.email.value,
        },
        "products": JSON.stringify(getProduct) // produits du panier
    }
    
    
    fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Accept": "application/json"
        },
        body: JSON.stringify(body)
    })
    
    .then(response => response.json())
    .then(json => { location.href = `./confirmation.html?orderid=${json['orderId']}`}) // console.log(json))
    .catch(err => console.log(err))
}


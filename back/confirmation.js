let contact =
{
    // firstName: firstName,
    // lasName: lastName,
    // address: address,
    // city: city,
    // email: email
};

// Obtention du prénom

let firstName = document.getElementById('firstName') // ^[A-Z][A-Za-z\é\è\ê\-]+$/
    .addEventListener('change', function(event) {
        firstName = event.target.value;
        console.log(firstName);
    })

document.getElementById('firstName')
    .addEventListener('change', function(event) {
        if (/^[A-Z][A-Za-z\é\è\ê\-]+$/.test(event.target.value)) {
            console.log('Prénom valide');
            contact.firstName=firstName;
            console.log(contact);
        } else {
            document.getElementById('firstNameErrorMsg')
                .innerText = 'Prénom non valide';
        }
    })


// Obtention du nom de famille

let lastName = document.getElementById('lastName') // /^[A-Z][A-Za-z\é\è\ê\-]+$/
    .addEventListener('change', function(event) {
        lastName = event.target.value;
        console.log(lastName);
    })

document.getElementById('lastName')
    .addEventListener('change', function(event) {
        if (/^[A-Z][A-Za-z\é\è\ê\-]+$/.test(event.target.value)) {
            console.log('Nom valide');
            contact.lastName = lastName;
            console.log(contact);
        } else {
            document.getElementById('lastNameErrorMsg')
            .innerText = 'Nom non valide';
        }
    })


// Obtention de l'adresse

let address = document.getElementById('address') // /^[a-zA-Z0-9\s,'-]*$ OU /^[a-zA-Z0-9\s,.'-]{3,}$/ . /
    .addEventListener('change', function(event) {
        console.log(event.target.value)
        address = event.target.value
    })

document.getElementById('address')
    .addEventListener('change', function(event) {
        if (/^[a-zA-Z0-9\s,\'-]*$/.test(event.target.value)) {
            console.log('Adresse valide');
            contact.address = address;
            console.log(contact);
        } else {
            document.getElementById('addressErrorMsg')
            .innerText = 'Adresse non valide'
        }
    })


// Obtention de la ville

let city = document.getElementById('city') // /^[A-Z][A-Za-z\é\è\ê\-]+$/
    .addEventListener('change', function(event) {
        console.log(event.target.value)
        city = event.target.value
    })

document.getElementById('city')
    .addEventListener('change', function(event) {
        if (/^[A-Z][A-Za-z\é\è\ê\-]+$/.test(event.target.value)) {
            console.log('Ville valide');
            contact.city = city;
            console.log(contact);
        } else {
            document.getElementById('cityErrorMsg')
            .innerText = 'Ville non valide';
        }
    })


// Obtention de l'adresse email

let email = document.getElementById('email') // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    .addEventListener('change', function(event) {
        console.log(event.target.value)
        email = event.target.value
    })

document.getElementById('email')
    .addEventListener('change', function(event) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(event.target.value)) {
            console.log('Email valide');
            contact.email = email;
            console.log(contact);
        } else {
            document.getElementById('emailErrorMsg')
            .innerText = 'Prénom non valide';
        }
    })
    
console.log(contact) // Affichage de l'objet "contact" d'après le formulaire rempli par l'utilisateur

let listOfProducts = JSON.parse(localStorage.getItem('product')) // Affichage de la liste des produits choisis par l'utilisateur

let getOrder = document.getElementById('order')
    .addEventListener('click', (event) => {
        event.preventDefault();

        console.log(contact, listOfProducts) // Au clic, affichage des informations de l'utilisateur et la liste des produits choisis
        // localStorage.clear(); // Vide le panier

    });



// fetch('http://localhost:3000/api/products/order', {
//     method: "POST",
//     body: JSON.stringify(contact, listOfProducts),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         "Accept": "application/json"
//     }
// })

// .then(response => response.json())
// .then(json => console.log(json))
// .catch(err => console.log(err))


// let getProduct = JSON.parse(localStorage.getItem('product'))
//     console.log(getProduct)

// for (i=0; i<getProduct.length; i++) {
//     console.log(getProduct[i])
//     let usersProducts = 'Produit n°' + (i + 1) + ', Id : ' + getProduct[i].id + ', Couleur :  ' + getProduct[i].color + ', Quantité :  ' + getProduct[i].quantity;
//     console.log(usersProducts);
// }



function send(event) {
    event.preventDefault();
    fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(contact, listOfProducts)
        // body: JSON.stringify({value: document.getElementById('order').value})
})

.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})

.then(function(value) {
    document.getElementById('orderid')
    .innerText = value.postData.text;
})
}
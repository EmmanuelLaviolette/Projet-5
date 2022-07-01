// Affichage d'un produit sur la page produits via son ID

let params = (new URL(document.location)).searchParams;
let $id = params.get('id');

console.log($id);

fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(products) {



        for (let product of products) {

            if (product._id == $id) {

                let newImage = document.createElement('img');
                    newImage.setAttribute('src', product.imageUrl);
                    newImage.setAttribute('alt', product.altTxt);

                let newName = document.getElementById('title');
                    newName.innerText = product.name;

                let newPrice = document.getElementById('price');
                    newPrice.innerText = product.price

                let newDescription = document.getElementById('description');
                    newDescription.innerText = product.description;


                for (let i=0; i<product.colors.length; i++) {
                    console.log(product.colors);

                    let newColor = document.createElement('option');
                    newColor.setAttribute('value', product.colors);

                }

            } else {
                console.log('Erreur');
            }

            // const itemImg = document.getElementByClassName('item__img');
            // console.log(itemImg);
            
            // itemImg.append(newImage);

        }

    })
    .catch(function(err) {
        // Une erreur est survenue
    });



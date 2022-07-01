// Affichage d'un produit sur la page produits via son ID

let params = (new URL(document.location)).searchParams;
let $id = params.get('id');

fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(products) {


        for (let product of products) {

            if (product._id == $id) {

                // let selectItemImg = document.getElementByClassName('item__img');
                // console.log(selectItemImg)

                let newImage = document.createElement('img');
                    newImage.setAttribute('src', product.imageUrl);
                    newImage.setAttribute('alt', product.altTxt);
                    console.log(newImage);

                // selectItemImg.append(newImage);

                let newName = document.getElementById('title');
                    newName.innerText = product.name;

                let newPrice = document.getElementById('price');
                    newPrice.innerText = product.price;

                let newDescription = document.getElementById('description');
                    newDescription.innerText = product.description;


                for (let color of product.colors) {

                    let selectOption = document.getElementById('colors');

                    let newColor = document.createElement('option');
                        newColor.setAttribute('value', color);
                        newColor.innerText = color;

                    selectOption.append(newColor);

                }


            } //else {
            //     console.log('Erreur');
            // };


            
            // 

        }

    })
    .catch(function(err) {
        // Une erreur est survenue
    });



// Affichage d'un produit sur la page produits via son ID

let params = (new URL(document.location)).searchParams;
let $id = params.get('id');
// console.log($id);

fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (products) {

        for (let product of products) {

            if (product._id == $id) {

                let newImage = document.createElement('img');
                    newImage.setAttribute('src', product.imageUrl);
                    newImage.setAttribute('alt', product.altTxt);

                let selectItemImg = document.getElementsByClassName('item__img')[0];

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

                selectItemImg.append(newImage);

                let idOfProduct = $id;
                idOfProduct = JSON.stringify(idOfProduct);
        
                let button = document.getElementById("addToCart")
        
                    button.addEventListener("click", () => {
        
                        let productInfos =
                            {
                                id : JSON.parse(idOfProduct),
                                color : document.getElementById('colors').value,
                                quantity : document.getElementById('quantity').value
                            }
                        let productInLocalStorage = JSON.parse(localStorage.getItem("product"))
        
                            if(productInLocalStorage){ 

                                for (let i=0; i < productInLocalStorage.length; i++) {

                                    if( productInLocalStorage[i].id == productInfos.id && productInLocalStorage[i].color == productInfos.color) { // Si l'id & couleur du panier correspondent

                                        let addQuantity = parseInt(productInLocalStorage[i].quantity) + parseInt(productInfos.quantity);

                                        productInfos =
                                            {
                                                id: JSON.parse(idOfProduct),
                                                color: document.getElementById('colors').value,
                                                quantity: JSON.stringify(addQuantity)
                                            }

                                        let deleteProduct = productInLocalStorage.splice(i, 1, productInfos);// Supprimer le produit dans localStorage

                                        localStorage.setItem("product", JSON.stringify(productInLocalStorage))// Ajout du nouvel array

                                        return;
                                    } else { }
                                }

                                productInLocalStorage.push(productInfos)
                                localStorage.setItem('product', JSON.stringify(productInLocalStorage))
                        
                            } else { 
        
                                productInLocalStorage = []
                                productInLocalStorage.push(productInfos)
                                localStorage.setItem("product", JSON.stringify(productInLocalStorage))
        
                            }
                        
                        // console.log('Produit ajouté au panier');
                    })

            }

        }

    })
    .catch(function (err) {
        // Une erreur est survenue
    });
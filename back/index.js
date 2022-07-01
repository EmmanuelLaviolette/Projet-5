// Affichage des produits sur la page d'accueil

fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(products) {

        const sectionItems = document.querySelector('section.items');

        for (let product of products) {

            let newLink = document.createElement('a');
                newLink.setAttribute('href', './product.html?id=' + product._id);

            let newArticle = document.createElement("article");

            let newImage = document.createElement('img');
                newImage.setAttribute('src', product.imageUrl);
                newImage.setAttribute('alt', product.altTxt);

            let newName = document.createElement('h3');
                newName.innerText = product.name;
                newName.classList.add('productName');

            let newDescription = document.createElement('p');
                newDescription.innerText = product.description;
                newDescription.classList.add('productDescription');
            
            sectionItems.append(newLink);

            newLink.append(newArticle);
            
            newArticle.append(newImage);
            newArticle.append(newName);
            newArticle.append(newDescription);
        }
    })
    .catch(function(err) {
        // Une erreur est survenue
    });
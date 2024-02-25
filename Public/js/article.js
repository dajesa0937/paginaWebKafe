// Definimos una función para manejar los detalles del artículo
function showArticleDetails() {
    // Extraemos los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    // Encontramos el artículo correspondiente al ID
    const article = articles.find(article => article.id === parseInt(articleId));

    // Creamos un elemento div para mostrar los detalles del artículo
    const articleDetails = document.getElementById('articleDetails');

    // Mostramos la imagen, nombre y precio del artículo
    const img = document.createElement('img');
    img.src = article.image;
    articleDetails.appendChild(img);

    const articleNameElement = document.createElement('h2');
    articleNameElement.textContent = article.name;
    articleDetails.appendChild(articleNameElement);

    const price = document.createElement('p');
    price.textContent = `$${article.price.toLocaleString()}`; // Utilizamos toLocaleString() para agregar la separación de miles
    articleDetails.appendChild(price);

}

// Llamamos a la función showArticleDetails() cuando la página se haya cargado completamente
window.addEventListener('load', showArticleDetails);

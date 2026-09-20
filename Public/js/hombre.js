const articles = [
    { id: 1, name: "camiseta tipo polo", price: 60000, image: "img/imgcamis05.jpg" },
    { id: 2, name: "camiseta", price: 30000, image: "img/imghbre02.jpeg" },
    { id: 3, name: "camiseta algodon", price: 35000, image: "img/imghbre01.jpeg" },
    { id: 4, name: "camisetas variadas", price: 30000, image: "img/imgcamis06.jpg" },
    { id: 5, name: "camiseta", price: 30000, image: "img/imgcamis02.jpeg" }
];

function createArticleCard(article) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const img = document.createElement('img');
    img.src = article.image;
    card.appendChild(img);
    
    const name = document.createElement('h2');
    name.textContent = article.name;
    card.appendChild(name);
    
    const price = document.createElement('p');
    price.textContent = `$${article.price.toLocaleString()}`;
    card.appendChild(price);
    
    card.addEventListener('click', () => {
        // Redirigir a article.html con el ID del artículo en la URL
        window.location.href = `article.html?id=${article.id}&gender=hombre`; // Aquí se pasa el género como parámetro también
    });
    
    return card;
}

function renderArticles() {
    const cardContainer = document.getElementById('cardContainer');
    articles.forEach(article => {
        const card = createArticleCard(article);
        cardContainer.appendChild(card);
    });
}

renderArticles();

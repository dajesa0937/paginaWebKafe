const articles = [
    { id: 1, name: "anillo amazonico", price: 50000, image: "img/imganillos02.jpeg" },
    { id: 2, name: "mochila guajira", price: 120000, image: "img/imgmoch05.jpeg" },
    { id: 3, name: "mochila guajira", price: 120000, image: "img/imgmoch04.jpeg" },
    { id: 4, name: "filigrana momposina", price: 230000, image: "img/imagenFiligrana08.jpeg" },
    { id: 5, name: "mochila guajira", price: 120000, image: "img/imgmoch02.jpeg" }
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
        window.location.href = `article.html?id=${article.id}&gender=artesania`; // Se pasa el género como parámetro
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

const articles = [
    { id: 1, name: "aretes filigrana", price: 50000, image: "img/imagenFiligrana03.jpeg" },
    { id: 2, name: "cadena  filigrana", price: 135000, image: "img/imagenFiligrana02.jpeg" },
    { id: 3, name: "anillos amazonico", price: 145000, image: "img/imganillos01.jpeg" },
    { id: 4, name: "anillos filigrana", price: 123000, image: "img/imagenFiligrana05.jpeg" },
    { id: 5, name: "aretes filigrana", price: 145000, image: "img/imagenFiligrana06.jpeg" }
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
    price.textContent = `$${article.price.toLocaleString()}`; // Utilizamos toLocaleString() para agregar la separación de miles
    card.appendChild(price);
    
    
    card.addEventListener('click', () => {
        window.location.href = `article.html?id=${article.id}`;
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

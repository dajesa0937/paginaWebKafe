

const articles = [
    { id: 1, name: "camiseta lycra fria", price: 30000, image: "img/camiseta7.jpeg" },
    { id: 2, name: "camiseta lycra fria", price: 30000, image: "img/camiseta8.jpeg" },
    { id: 3, name: "camiseta lycra fria", price: 30000, image: "img/camiseta9.jpeg" },
    { id: 4, name: "camiseta lycra fria", price: 30000, image: "img/camiseta10.jpeg" },
    { id: 5, name: "camiseta lycra fria", price: 30000, image: "img/camiseta11.jpeg" },
    { id: 6, name: "camiseta lycra fria", price: 30000, image: "img/camiseta1.jpeg" },
    { id: 7, name: "camiseta lycra fria", price: 30000, image: "img/camieseta2.jpeg" },
    { id: 8, name: "camiseta lycra fria", price: 30000, image: "img/camiseta3.jpeg" },
    { id: 9, name: "pijamas algodon", price: 20000, image: "img/pijamas01.jpeg" },
    { id: 10, name: "pijamas algodon", price: 20000, image: "img/pijamas02.jpeg" },
    { id: 11, name: "pijamas algodon", price: 20000, image: "img/pijamas03.jpeg" },
    { id: 12, name: "pijamas algodon", price: 20000, image: "img/pijamas04.jpeg" },
    { id: 13, name: "pijamas algodon", price: 20000, image: "img/pijamas05.jpeg" },
    { id: 14, name: "tulas lona-dril 40x40 cms", price: 25000, image: "img/tulas01.jpeg" },
    { id: 15, name: "tulas lona-dril 40x40 cms", price: 25000, image: "img/tulas02.jpeg" }
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
        // Redirigir a article.html con el ID del artículo en la URL
        window.location.href = `article.html?id=${article.id}&gender=index`; // Aquí se pasa el género como parámetro también
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
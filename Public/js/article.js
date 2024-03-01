// Definimos los arreglos de artículos para cada categoría
const index = [
    { id: 1, name: "camisetas", price: 50000, image: "img/imgcamis01.jpeg" },
    { id: 2, name: "mochilas", price: 135000, image: "img/imgmoch08.jpeg" },
    { id: 3, name: "camisetas de algodon", price: 145000, image: "img/imgcamis03.jpeg" },
    { id: 4, name: "cadena filigrana", price: 123000, image: "img/imagenFiligrana04.jpeg" },
    { id: 5, name: "aretes filigrana", price: 145000, image: "img/imagenFiligrana09.jpeg" }
];

const mujer = [
    // Definir los artículos para la categoría mujer aquí
    { id: 1, name: "aretes filigrana", price: 50000, image: "img/imagenFiligrana03.jpeg" },
    { id: 2, name: "cadena  filigrana", price: 135000, image: "img/imagenFiligrana02.jpeg" },
    { id: 3, name: "anillos amazonico", price: 145000, image: "img/imganillos01.jpeg" },
    { id: 4, name: "anillos filigrana", price: 123000, image: "img/imagenFiligrana05.jpeg" },
    { id: 5, name: "aretes filigrana", price: 145000, image: "img/imagenFiligrana06.jpeg" }
];

const hombre = [
    // Definir los artículos para la categoría hombre aquí
    { id: 1, name: "camiseta tipo polo", price: 60000, image: "img/imgcamis05.jpg" },
    { id: 2, name: "camiseta", price: 30000, image: "img/imghbre02.jpeg" },
    { id: 3, name: "camiseta algodon", price: 35000, image: "img/imghbre01.jpeg" },
    { id: 4, name: "camisetas variadas", price: 30000, image: "img/imgcamis06.jpg" },
    { id: 5, name: "camiseta", price: 30000, image: "img/imgcamis02.jpeg" }
];

const artesania = [
    // Definir los artículos para la categoría artesanía aquí
    { id: 1, name: "anillo amazonico", price: 60000, image: "img/imganillos02.jpeg" },
    { id: 2, name: "mochila guajira", price: 130000, image: "img/imgmoch05.jpeg" },
    { id: 3, name: "mochila guajira", price: 135000, image: "img/imgmoch04.jpeg" },
    { id: 4, name: "filigrana momposina", price: 130000, image: "img/imagenFiligrana08.jpeg" },
    { id: 5, name: "mochila guajira", price: 130000, image: "img/imgmoch02.jpeg" }
];
// Definimos una función para manejar los detalles del artículo
function showArticleDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const gender = urlParams.get('gender');
    let articles = [];

    if (gender === 'hombre') {
        articles = hombre;
    } else if (gender === 'mujer') {
        articles = mujer;
    } else if (gender === 'artesania') {
        articles = artesania;
    } else if (gender === 'index') {
        articles = index; 
    }

    const article = articles.find(article => article.id === parseInt(articleId));

    if (!article) {
        console.error('El artículo no fue encontrado');
        return;
    }

    const articleDetails = document.getElementById('articleDetails');

    const img = document.createElement('img');
    img.src = article.image;
    articleDetails.appendChild(img);

    const articleNameElement = document.createElement('h2');
    articleNameElement.textContent = article.name;
    articleDetails.appendChild(articleNameElement);

    const price = document.createElement('p');
    price.textContent = `$${article.price.toLocaleString()}`;
    articleDetails.appendChild(price);
}

window.addEventListener('load', showArticleDetails);

function openWhatsApp() {
    // Aquí colocamos la lógica para abrir un chat de WhatsApp
    // Debes cambiar el número de teléfono con el prefijo internacional correspondiente (por ejemplo, +57 para Colombia)
    window.open('https://api.whatsapp.com/send?phone=573164071839', '_blank'); // Cambia el número de teléfono según sea necesario
}
 
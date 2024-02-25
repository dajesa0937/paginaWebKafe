const productImages = document.querySelectorAll(".product-images img");
const imageSlider = document.querySelector(".image-slider");

productImages.forEach((item) => {
    item.addEventListener('click', () => {
        // Obtener la ruta completa de la imagen
        const imageUrl = item.src;
        // Cambiar la propiedad background-image del contenedor image-slider
        imageSlider.style.backgroundImage = `url('${imageUrl}')`;
        // Obtener otros datos del producto si están disponibles
        const productBrand = item.parentNode.querySelector('.product-brand');
        const price = item.parentNode.querySelector('.price');
        const actualPrice = item.parentNode.querySelector('.actual-price');
        // Verificar si los elementos existen antes de acceder a sus propiedades
        const productName = productBrand ? productBrand.innerText : '';
        const productPrice = price ? price.innerText : '';
        const productActualPrice = actualPrice ? actualPrice.innerText : '';
    });

});


    // Redireccionar a la página de producto con los datos del producto en la URL
    function redirectToProduct() {
        window.location.href = 'product.html';
    }
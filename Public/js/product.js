const productImages = document.querySelectorAll(".product-images img");
const imageSlider = document.querySelector(".image-slider");

productImages.forEach((item) => {
    item.addEventListener('click', () => {
        // Obtener la ruta completa de la imagen
        const imageUrl = item.src;
        // Cambiar la propiedad background-image del contenedor image-slider
        imageSlider.style.backgroundImage = `url('${imageUrl}')`;
        // Obtener otros datos del producto si están disponibles
        
    });

});


    // Redireccionar a la página de producto con los datos del producto en la URL
    function redirectToProduct() {
        window.location.href = 'product.html';
    }

    function abrirWhatsApp() {
        // Aquí colocamos la lógica para abrir un chat de WhatsApp
        // Debes cambiar el número de teléfono con el prefijo internacional correspondiente (por ejemplo, +57 para Colombia)
        window.open('https://api.whatsapp.com/send?phone=573164071839', '_blank'); // Cambia el número de teléfono según sea necesario
    }
     
const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
    <div class="footer-content">
    <img src="img/light-logo.jpg" class="logo" alt="">

  <div class="footer-ul-container">
        <ul class="category">
            <li class="category-title">mujeres</li>
            <li><a href="mujer.html" class="footer-link">camisetas</a> </li>
            <li><a href="mujer.html" class="footer-link">vestidos</a> </li>
            <li><a href="mujer.html" class="footer-link">camisas</a> </li> 
            
        </ul>

        <ul class="category">
            <li class="category-title">hombres</li>
            <li><a href="hombre.html" class="footer-link">sueters</a> </li>
            <li><a href="hombre.html" class="footer-link">camisetas</a> </li>
            <li><a href="hombre.html" class="footer-link">camisetas polo</a> </li>
        </ul>

        <ul class="category">
            <li class="category-title">artesanias</li>
            <li><a href="artesania.html" class="footer-link">cadenas</a> </li>
            <li><a href="artesania.html" class="footer-link">anillos</a> </li>
            <li><a href="artesania.html" class="footer-link">brazaletes</a> </li>
            <li><a href="artesania.html" class="footer-link">Vinos</a> </li>
        </ul>

        
    </div>
       
</div>
<p class="footer-title">acerca Tienda Virtual k'fe </p> 
       <p class="info">Somos una empresa con mas de 15 años de experiencia en el
       mundo de la moda - Ubicada en la Ciudad de Medellín - Cluster de la Moda en Colombia
       Todos nuestros productos son garantizados para una mejor experiencia y confort -
       para sentirse cómodo con su apariencia personal. </p> 

       <p class="footer-title2">Email: ventas@kfetiendavirtual.com</p> 
       <p class="info">Movil: 316 407 1839 </p> 
       <div class="footer-social-container">
           <div>
               <a  class="social-link">Visita Nuestras Redes Sociales 
                =====>>>>> ===>>>  >>>>>>>>>>></a>
               
           </div>

           <div>
            <a href="https://www.instagram.com/kfe.desings/" class="social-link">instagram</a>
            <a href="https://www.facebook.com/kfe.desings/" class="social-link">Facebook</a>
            <a href="https://wa.me/573164071839" class="social-link">whatsapp</a>

        </div>


       </div>
       <p class="footer-credit">Solo lo mejor lo encuentras en K'FE Tienda Virtual</p>
    `;
}

createFooter();

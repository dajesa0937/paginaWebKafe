const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML =   `  
        <div class="nav">
            <img src="img/logokfefinal.jpg" class="brand-logo" alt="">
            <h1 align="center" font-style="roboto">K'FE <br>Camisetas Accesorios <br>y Artesanías </h1>
            <div class="nav-items">
                <div class="search">
                    <input type="text" class="search-box" placeholder="Buscar Marca, Producto">
                    <button class="search-btn"> Buscar </button>
                </div>  
                <a href="#"><img src="img/imagenUsuario.svg" width="30px" height="30px"   alt=""></a>
                <a href="#"> <img src="img/imagenCarritoCompras.svg" width="30px" height="30px"   alt="" ></a>
            </div>
        </div>

        <ul class="links-container"> 
            <li class="link-item"><a href="index.html" class="link"> Inicio</a> </li>
            <li class="link-item"><a href="mujer.html" class="link"> Mujeres</a> </li>   
            <li class="link-item"><a href="hombre.html" class="link"> Hombres</a> </li>
            <li class="link-item"><a href="artesania.html" class="link"> Artesanías</a> </li>    
        </ul>   
    `;
}

createNav();

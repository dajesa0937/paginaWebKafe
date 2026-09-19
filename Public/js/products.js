/* =========================================================
   K'FE — Catálogo y configuración del negocio
   Para agregar un producto: copia una línea de PRODUCTOS,
   cambia el id (único), nombre, precio e imagen.
   ========================================================= */

const NEGOCIO = {
  nombre: "K'FE Confecciones",
  whatsapp: "573164071839",               // Número con indicativo, sin + ni espacios
  telefonoVisible: "316 407 1839",
  email: "ventas@kfetiendavirtual.com",
  ciudad: "Medellín, Colombia",
  instagram: "https://www.instagram.com/kfe.desings/",
  facebook: "https://www.facebook.com/kfe.desings/",
  anosExperiencia: 15,
  // Pedido mínimo para acceder al precio por mayor (unidades surtidas).
  // AJUSTAR según la política real de la fábrica.
  minimoMayor: 6
};

/* Niveles de compra por volumen (se muestran en Inicio y Mayoristas). */
const NIVELES_MAYOR = [
  { nombre: "Emprendedor", desde: 6, hasta: 11, texto: "Ideal para empezar a vender por catálogo o redes.", beneficios: ["Precio especial por mayor", "Surtido de referencias y tallas", "Asesoría por WhatsApp"] },
  { nombre: "Tienda", desde: 12, hasta: 49, destacado: true, texto: "Para boutiques y tiendas que renuevan inventario.", beneficios: ["Mejor precio por unidad", "Prioridad en referencias nuevas", "Fotos para tus redes"] },
  { nombre: "Distribuidor", desde: 50, hasta: null, texto: "Volumen, reventa y pedidos especiales.", beneficios: ["Precio de fábrica", "Producción por pedido", "Atención personalizada"] }
];

const CATEGORIAS = {
  mujer:   { nombre: "Mujer",       url: "mujer.html",   imagen: "img/opt/camiseta5.jpg",   descripcion: "Camisetas en lycra fría y blusas estampadas" },
  hombre:  { nombre: "Hombre",      url: "hombre.html",  imagen: "img/opt/polo-negra.jpg",  descripcion: "Camisetas tipo polo y camisetas estampadas" },
  pijamas: { nombre: "Pijamas",     url: "pijamas.html", imagen: "img/opt/pijama3.jpg",     descripcion: "Pijamas en algodón para dama y caballero" },
  jeans:   { nombre: "Jeans hombre", url: "jeans.html",  imagen: "",                         descripcion: "Blue jeans de hombre", nuevo: true }
};

/* destacado: true  -> aparece en "Lo más pedido" del inicio */
const PRODUCTOS = [
  // ---------- MUJER ----------
  { id: "m-oso-happier",    categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Osito Happier",       precio: 30000, imagen: "img/opt/camiseta1.jpg", tela: "Lycra fría", destacado: true },
  { id: "m-panda",          categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Panda Music",         precio: 30000, imagen: "img/opt/camiseta5.jpg", tela: "Lycra fría", destacado: true },
  { id: "m-best-friend",    categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Teddy Best Friend",   precio: 30000, imagen: "img/opt/camiseta3.jpg", tela: "Lycra fría", destacado: true },
  { id: "m-grow-dreams",    categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Grow Your Dreams",    precio: 30000, imagen: "img/opt/camiseta6.jpg", tela: "Lycra fría" },
  { id: "m-peace-love",     categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Peace · Love",        precio: 30000, imagen: "img/opt/camiseta4.jpg", tela: "Lycra fría" },
  { id: "m-blusas-surtidas",categoria: "mujer", tipo: "Blusas",    nombre: "Blusas estampadas surtidas",   precio: 30000, imagen: "img/opt/blusas-surtidas.jpg", tela: "Lycra fría", destacado: true },
  { id: "m-basicas-color",  categoria: "mujer", tipo: "Blusas",    nombre: "Blusas combinadas de color",   precio: 30000, imagen: "img/opt/basicas-combinadas.jpg", tela: "Lycra fría" },
  { id: "m-lycra-colores",  categoria: "mujer", tipo: "Blusas",    nombre: "Blusas lycra fría colores",    precio: 30000, imagen: "img/opt/lycra-colores.jpg", tela: "Lycra fría" },
  { id: "m-basicas-estamp", categoria: "mujer", tipo: "Blusas",    nombre: "Blusas básicas estampadas",    precio: 30000, imagen: "img/opt/basicas-estampadas.jpg", tela: "Lycra fría" },

  // ---------- HOMBRE ----------
  { id: "h-polo-negra",     categoria: "hombre", tipo: "Polos",     nombre: "Camiseta tipo polo",           precio: 60000, imagen: "img/opt/polo-negra.jpg", tela: "Piqué", destacado: true },
  { id: "h-polos-colores",  categoria: "hombre", tipo: "Polos",     nombre: "Polos surtidas por colores",   precio: 60000, imagen: "img/opt/polos-colores.jpg", tela: "Piqué", destacado: true },
  { id: "h-relax",          categoria: "hombre", tipo: "Camisetas", nombre: "Camiseta Relax",               precio: 30000, imagen: "img/opt/hombre-relax.jpg", tela: "Algodón" },
  { id: "h-no-pain",        categoria: "hombre", tipo: "Camisetas", nombre: "Camiseta No Pain No Gain",     precio: 35000, imagen: "img/opt/hombre-nopain.jpg", tela: "Algodón", destacado: true },

  // ---------- PIJAMAS ----------
  { id: "p-unicornio",      categoria: "pijamas", tipo: "Dama", nombre: "Pijama short estampado",       precio: 20000, imagen: "img/opt/pijama1.jpg", tela: "Algodón", destacado: true },
  { id: "p-cebra",          categoria: "pijamas", tipo: "Dama", nombre: "Pijama short animal print",    precio: 20000, imagen: "img/opt/pijama2.jpg", tela: "Algodón" },
  { id: "p-noche",          categoria: "pijamas", tipo: "Dama", nombre: "Pijama short fantasía",        precio: 20000, imagen: "img/opt/pijama3.jpg", tela: "Algodón" },
  { id: "p-letras",         categoria: "pijamas", tipo: "Dama", nombre: "Pijama short letras",          precio: 20000, imagen: "img/opt/pijama4.jpg", tela: "Algodón" },
  { id: "p-tropical",       categoria: "pijamas", tipo: "Dama", nombre: "Pijama short tropical",        precio: 20000, imagen: "img/opt/pijama5.jpg", tela: "Algodón" },

  // Pijamas de hombre y jeans: agregar aquí cuando estén las fotos, p. ej.
  // { id: "p-hombre-1", categoria: "pijamas", tipo: "Caballero", nombre: "Pijama pantalón caballero", precio: 45000, imagen: "img/opt/pijama-hombre-1.jpg", tela: "Algodón" },
  // { id: "j-clasico-1", categoria: "jeans", tipo: "Clásico", nombre: "Jean clásico hombre", precio: 70000, imagen: "img/opt/jean-1.jpg", tela: "Denim" },
];

/* ---------- Utilidades compartidas ---------- */
const formatoCOP = (valor) => "$" + Number(valor).toLocaleString("es-CO");

function enlaceWhatsApp(mensaje) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

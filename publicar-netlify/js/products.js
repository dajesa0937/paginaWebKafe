/* =========================================================
   K'FE — Catálogo y configuración del negocio
   Para agregar un producto: copia una línea de PRODUCTOS,
   cambia el id (único), nombre, precio e imagen.
   ========================================================= */

const NEGOCIO = {
  nombre: "Inversiones K'FE Designs",
  whatsapp: "573164071839",               // Número con indicativo, sin + ni espacios
  telefonoVisible: "316 407 1839",
  email: "karinaferia1210@gmail.com",
  ciudad: "Medellín, Colombia",
  instagram: "https://www.instagram.com/kfe.desings/",
  facebook: "https://www.facebook.com/kfe.desings/",
  anosExperiencia: 15,
  // Pedido mínimo para acceder al precio por mayor (unidades surtidas).
  // AJUSTAR según la política real de la fábrica.
  minimoMayor: 6,
  // Condiciones de compra (se muestran en la "Nota importante" de la página)
  envios: "Envíos a toda Colombia. El valor del envío lo paga el cliente.",
  pagos: "Pagos por transferencia bancaria o Nequi.",
  disponibilidad: "Las prendas pueden agotarse rápidamente. Consulta siempre la disponibilidad antes de pagar."
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
  pijamas: { nombre: "Pijamas",     url: "pijamas.html", imagen: "img/opt/pijama-pantalon-rayas-rosa.jpg", descripcion: "Pijamas en algodón para dama y caballero" },
  jeans:   { nombre: "Jeans",       url: "jeans.html",   imagen: "img/opt/jean-wide-leg-azul-claro.jpg", descripcion: "Jeans para dama y hombre", nuevo: true }
};

/* destacado: true  -> se muestra primero en el catálogo
   imagenes: [...]   -> fotos adicionales en la página del producto (opcional)
   precio: null      -> se muestra "Consultar precio"
   oculto: true      -> el producto NO aparece en la página
   tambienEn: [...]  -> el producto también aparece en esas secciones (ej. ["hombre"])
   reventa: true     -> prenda de marca que revendemos (no se presenta como fabricación propia) */

/* Productos que se muestran en "Lo más pedido" del inicio (en este orden) */
const DESTACADOS_INICIO = ["p-rayas-arcoiris", "j-azul-claro", "m-vive-simple", "h-polo-negra", "p-dinos-color", "j-azul-medio", "m-erizo-flores", "p-pantalon-rosa"];
const CATALOGO = [
  // ---------- MUJER ----------
  { id: "m-vive-simple",     categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Vive Simple",          precio: 25000, imagen: "img/opt/camiseta-dama-vive-simple.jpg", tela: "Tela suave", destacado: true },
  { id: "m-erizo-flores",    categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Erizo de Flores",      precio: 25000, imagen: "img/opt/camiseta-dama-erizo-flores.jpg", tela: "Tela suave", destacado: true },
  { id: "m-flores-silvestres", categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Flores Silvestres",  precio: 25000, imagen: "img/opt/camiseta-dama-flores-silvestres.jpg", tela: "Tela suave", destacado: true },
  { id: "m-bicicleta",       categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Bicicleta de Mariposas", precio: 25000, imagen: "img/opt/camiseta-dama-bicicleta.jpg", tela: "Tela suave", destacado: true },
  { id: "m-corazones",       categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Corazones",            precio: 25000, imagen: "img/opt/camiseta-dama-corazones.jpg", tela: "Tela suave", destacado: true },
  { id: "m-lovebug",         categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Lovebug",              precio: 25000, imagen: "img/opt/camiseta-dama-lovebug.jpg", tela: "Tela suave", destacado: true },
  { id: "m-conejitos",       categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Conejitos",            precio: 25000, imagen: "img/opt/camiseta-dama-conejitos.jpg", tela: "Tela suave", destacado: true },
  { id: "m-oso-happier",    categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Osito Happier",       precio: 30000, imagen: "img/opt/camiseta1.jpg", tela: "Lycra fría" },
  { id: "m-panda",          categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Panda Music",         precio: 30000, imagen: "img/opt/camiseta5.jpg", tela: "Lycra fría", destacado: true },
  { id: "m-best-friend",    categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Teddy Best Friend",   precio: 30000, imagen: "img/opt/camiseta3.jpg", tela: "Lycra fría" },
  { id: "m-grow-dreams",    categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Grow Your Dreams",    precio: 30000, imagen: "img/opt/camiseta6.jpg", tela: "Lycra fría" },
  { id: "m-peace-love",     categoria: "mujer", tipo: "Camisetas", nombre: "Camiseta Peace · Love",        precio: 30000, imagen: "img/opt/camiseta4.jpg", tela: "Lycra fría" },
  { id: "m-blusas-surtidas",categoria: "mujer", tipo: "Blusas",    nombre: "Blusas estampadas surtidas",   precio: 30000, imagen: "img/opt/blusas-surtidas.jpg", tela: "Lycra fría", destacado: true },
  { id: "m-basicas-color",  categoria: "mujer", tipo: "Blusas",    nombre: "Blusas combinadas de color",   precio: 30000, imagen: "img/opt/basicas-combinadas.jpg", tela: "Lycra fría" },
  { id: "m-lycra-colores",  categoria: "mujer", tipo: "Blusas",    nombre: "Blusas lycra fría colores",    precio: 30000, imagen: "img/opt/lycra-colores.jpg", tela: "Lycra fría" },
  { id: "m-basicas-estamp", categoria: "mujer", tipo: "Blusas",    nombre: "Blusas básicas estampadas",    precio: 30000, imagen: "img/opt/basicas-estampadas.jpg", tela: "Lycra fría" },
  { id: "m-frases",         categoria: "mujer", tipo: "Camisetas", nombre: "Camisetas con frases surtidas", precio: 30000, imagen: "img/opt/camisetas-frases.jpg", tela: "Lycra fría", destacado: true },

  // ---------- HOMBRE ----------
  { id: "h-polo-negra",     categoria: "hombre", tipo: "Polos",     nombre: "Camiseta tipo polo",           precio: 60000, imagen: "img/opt/polo-negra.jpg", tela: "Piqué", destacado: true },
  { id: "h-polos-colores",  categoria: "hombre", tipo: "Polos",     nombre: "Polos surtidas por colores",   precio: 60000, imagen: "img/opt/polos-colores.jpg", tela: "Piqué", destacado: true },
  { id: "h-relax",          categoria: "hombre", tipo: "Camisetas", nombre: "Camiseta Relax",               precio: 30000, imagen: "img/opt/hombre-relax.jpg", tela: "Algodón" },
  { id: "h-no-pain",        categoria: "hombre", tipo: "Camisetas", nombre: "Camiseta No Pain No Gain",     precio: 35000, imagen: "img/opt/hombre-nopain.jpg", tela: "Algodón", destacado: true },

  // ---------- PIJAMAS ----------
  { id: "p-rayas-arcoiris", categoria: "pijamas", tipo: "Short",    nombre: "Pijama short rayas arcoíris",  precio: 20000, imagen: "img/opt/pijama-short-rayas-arcoiris.jpg", tela: "Algodón", destacado: true },
  { id: "p-floral-pastel",  categoria: "pijamas", tipo: "Short",    nombre: "Pijama short floral pastel",   precio: 20000, imagen: "img/opt/pijama-short-floral-pastel.jpg", tela: "Algodón", oculto: true }, // OCULTO: estampado con personaje Piolín (Looney Tunes). Publicar solo con licencia.
  { id: "p-lila-estampado", categoria: "pijamas", tipo: "Short",    nombre: "Pijama short lila estampado",  precio: 20000, imagen: "img/opt/pijama-short-lila-estampado.jpg", tela: "Algodón", oculto: true }, // OCULTO: estampado con personajes Disney (princesas). Publicar solo con licencia.
  { id: "p-celeste",        categoria: "pijamas", tipo: "Short",    nombre: "Pijama short celeste estampado", precio: 20000,imagen: "img/opt/pijama-short-celeste-estampado.jpg", imagenes: ["img/opt/pijama-short-celeste-estampado-2.jpg"], tela: "Algodón", oculto: true }, // OCULTO: estampado con personajes Snoopy / Bluey. Publicar solo con licencia.
  { id: "p-circulos-azul",  categoria: "pijamas", tipo: "Short",    nombre: "Pijama short círculos azul",   precio: 20000, imagen: "img/opt/pijama-short-circulos-azul.jpg", tela: "Algodón", oculto: true }, // OCULTO: estampado con personajes Looney Tunes. Publicar solo con licencia.
  { id: "p-buhos-vino",     categoria: "pijamas", tipo: "Short",    nombre: "Pijama short estampado vino",  precio: 20000, imagen: "img/opt/pijama-short-buhos-vino.jpg", tela: "Algodón", oculto: true }, // OCULTO: estampado con personaje Cars (Disney/Pixar). Publicar solo con licencia.
  { id: "p-dinos-color",    categoria: "pijamas", tipo: "Short",    nombre: "Pijama short estampado multicolor", precio: 20000,imagen: "img/opt/pijama-short-dinos-color.jpg", tela: "Algodón" },
  { id: "p-tropical-verde", categoria: "pijamas", tipo: "Short",    nombre: "Pijama short tropical verde",  precio: 20000, imagen: "img/opt/pijama-short-tropical-verde.jpg", tela: "Algodón", oculto: true }, // OCULTO: estampado con personajes Disney/Pixar. Publicar solo con licencia.
  { id: "p-rayas-marinas",  categoria: "pijamas", tipo: "Short",    nombre: "Pijama short rayas",           precio: 20000, imagen: "img/opt/pijama-short-rayas-marinas.jpg", tela: "Algodón" },
  { id: "p-rosa-liso",      categoria: "pijamas", tipo: "Short",    nombre: "Pijama short rosa liso",       precio: 20000, imagen: "img/opt/pijama-short-rosa-liso.jpg", tela: "Algodón" },
  // precio: null -> se muestra "Consultar precio" (actualizar cuando se defina)
  { id: "p-pantalon-azul",  categoria: "pijamas", tipo: "Pantalón", nombre: "Pijama pantalón rayas azul",   precio: 35000,  imagen: "img/opt/pijama-pantalon-rayas-azul.jpg", tela: "Algodón", destacado: true },
  { id: "p-pantalon-rosa",  categoria: "pijamas", tipo: "Pantalón", nombre: "Pijama pantalón rayas rosa",   precio: 35000,  imagen: "img/opt/pijama-pantalon-rayas-rosa.jpg", tela: "Algodón", destacado: true },
  { id: "p-fucsia-floral",  categoria: "pijamas", tipo: "Short",    nombre: "Pijama short fucsia floral",   precio: 20000, imagen: "img/opt/pijama-fucsia-floral.jpg", tela: "Algodón" },
  { id: "p-ondas-roja",     categoria: "pijamas", tipo: "Short",    nombre: "Pijama short ondas rojas",     precio: 20000, imagen: "img/opt/pijama-ondas-roja.jpg", tela: "Algodón" },
  { id: "p-floral-gris",    categoria: "pijamas", tipo: "Short",    nombre: "Pijama short floral gris",     precio: 20000, imagen: "img/opt/pijama-floral-gris.jpg", tela: "Algodón" },
  { id: "p-lila-floral",    categoria: "pijamas", tipo: "Short",    nombre: "Pijama short lila floral",     precio: 20000, imagen: "img/opt/pijama-lila-floral.jpg", tela: "Algodón" },
  { id: "p-unicornio",      categoria: "pijamas", tipo: "Short",    nombre: "Pijama short estampado",       precio: 20000, imagen: "img/opt/pijama1.jpg", tela: "Algodón" },
  { id: "p-cebra",          categoria: "pijamas", tipo: "Short",    nombre: "Pijama short animal print",    precio: 20000, imagen: "img/opt/pijama2.jpg", tela: "Algodón" },
  { id: "p-noche",          categoria: "pijamas", tipo: "Short",    nombre: "Pijama short fantasía",        precio: 20000, imagen: "img/opt/pijama3.jpg", tela: "Algodón" },
  { id: "p-letras",         categoria: "pijamas", tipo: "Short",    nombre: "Pijama short letras",          precio: 20000, imagen: "img/opt/pijama4.jpg", tela: "Algodón" },
  { id: "p-tropical",       categoria: "pijamas", tipo: "Short",    nombre: "Pijama short tropical",        precio: 20000, imagen: "img/opt/pijama5.jpg", tela: "Algodón" },

  // ---------- JEANS ----------
  { id: "j-azul-claro",     categoria: "jeans", tipo: "Jeans dama", nombre: "Jean dama wide leg azul claro",      precio: 120000, imagen: "img/opt/jean-wide-leg-azul-claro.jpg", tela: "Denim", destacado: true },
  { id: "j-azul-medio",     categoria: "jeans", tipo: "Jeans dama", nombre: "Jean dama wide leg azul medio",      precio: 120000, imagen: "img/opt/jean-wide-leg-azul-medio.jpg", tela: "Denim", destacado: true },
  { id: "j-claro-rasgado",  categoria: "jeans", tipo: "Jeans dama", nombre: "Jean dama wide leg claro rasgado",   precio: 120000, imagen: "img/opt/jean-wide-leg-claro-rasgado.jpg", tela: "Denim" },
  { id: "j-clasico",        categoria: "jeans", tipo: "Jeans dama", nombre: "Jean dama wide leg azul clásico",    precio: 120000, imagen: "img/opt/jean-wide-leg-clasico-2.jpg", imagenes: ["img/opt/jean-wide-leg-clasico.jpg"], tela: "Denim" },

  // Jeans de hombre de marca (REVENTA, no son de fabricación propia): sin precio publicado
  { id: "j-hombre-1",       categoria: "jeans", tambienEn: ["hombre"], tipo: "Jeans hombre", nombre: "Jean hombre de marca",            precio: null, imagen: "img/opt/jean-hombre-frente.jpg", imagenes: ["img/opt/jean-hombre-espalda.jpg"], tela: "Denim", reventa: true },
  { id: "j-hombre-2",       categoria: "jeans", tambienEn: ["hombre"], tipo: "Jeans hombre", nombre: "Jean hombre de marca azul oscuro", precio: null, imagen: "img/opt/jean-hombre-oscuro.jpg", tela: "Denim", reventa: true },
  { id: "j-hombre-surtidos", categoria: "jeans", tambienEn: ["hombre"], tipo: "Jeans hombre", nombre: "Jeans hombre de marca surtidos", precio: null, imagen: "img/opt/jeans-hombre-surtidos.jpg", tela: "Denim", reventa: true },

  // Pijamas de hombre y jeans de hombre: agregar aquí cuando estén las fotos, p. ej.
  // { id: "j-hombre-1", categoria: "jeans", tambienEn: ["hombre"], tipo: "Jeans hombre", nombre: "Jean clásico hombre", precio: 70000, imagen: "img/opt/jean-hombre-1.jpg", tela: "Denim" },
];

/* Productos visibles en la página (los marcados con oculto: true no se publican) */
const PRODUCTOS = CATALOGO.filter((p) => !p.oculto);

/* ---------- Utilidades compartidas ---------- */
const formatoCOP = (valor) => valor == null ? "Consultar" : "$" + Number(valor).toLocaleString("es-CO");

function enlaceWhatsApp(mensaje) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

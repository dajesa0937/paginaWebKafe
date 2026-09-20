/* =========================================================
   K'FE — Componentes compartidos: cabecera, pie, WhatsApp,
   tarjeta de producto y animaciones.
   Requiere js/products.js cargado antes.
   ========================================================= */

const ICONOS = {
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.41"/></svg>',
  buscar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  cerrar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  fabrica: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M3 21V10l6 3.5V10l6 3.5V6l6-3v18z"/><path d="M7 17h2M12 17h2M17 17h1"/></svg>',
  etiqueta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
  escudo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" stroke-linecap="round" stroke-width="2.5"/></svg>',
  camion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M2 6h12v10H2zM14 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke-width="1.8"/><path d="m7.5 12 3 3 6-6"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3C16.7 2.2 15.6 2 14.4 2 11.8 2 10 3.6 10 6.5v2H7.5V12H10v10h4V12h2.8l.4-3.5z"/></svg>',
  reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  pago: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/></svg>',
  jean: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" aria-hidden="true"><path d="M16 6h32l4 52H37l-5-30-5 30H12z"/><path d="M16 12h32M24 12v6a5 5 0 0 1-5 5M40 12v6a5 5 0 0 0 5 5M32 12v10"/></svg>'
};

function marcaHTML() {
  return `
    <a href="index.html" class="marca" aria-label="Inversiones K'FE Designs - Inicio">
      <img src="img/logo-kfe-original.png" alt="" width="62" height="50">
      <span class="marca__texto">
        <span class="marca__nombre">K'FE</span>
        <span class="marca__lema">Designs · Fábrica</span>
      </span>
    </a>`;
}

function crearCabecera() {
  const destino = document.querySelector("[data-cabecera]");
  if (!destino) return;
  const pagina = document.body.dataset.pagina || "";
  const link = (href, texto, clave, extra = "") =>
    `<li><a href="${href}" ${pagina === clave ? 'aria-current="page"' : ""}>${texto}${extra}</a></li>`;

  destino.outerHTML = `
    <div class="anuncio">
      <strong>Precio especial al por mayor</strong> desde ${NEGOCIO.minimoMayor} und.<span class="solo-escritorio"> · Envíos a toda Colombia · Pagos por transferencia o Nequi</span> ·
      <a href="${enlaceWhatsApp("Hola K'FE, quiero consultar disponibilidad y precios por mayor.")}" target="_blank" rel="noopener">Consulta disponibilidad</a>
    </div>
    <header class="cabecera">
      <nav class="contenedor nav" aria-label="Principal">
        ${marcaHTML()}
        <ul class="menu" id="menu">
          <li><button class="icono-btn menu-cerrar" type="button" aria-label="Cerrar menú">${ICONOS.cerrar}</button></li>
          ${link("index.html", "Inicio", "inicio")}
          ${link("catalogo.html", "Catálogo", "catalogo")}
          ${link("mujer.html", "Mujer", "mujer")}
          ${link("hombre.html", "Hombre", "hombre")}
          ${link("pijamas.html", "Pijamas", "pijamas")}
          ${link("jeans.html", "Jeans", "jeans", '<span class="etiqueta-nuevo">NUEVO</span>')}
          ${link("mayoristas.html", "Mayoristas", "mayoristas")}
        </ul>
        <div class="nav__acciones">
          <button class="icono-btn" type="button" data-abrir-busqueda aria-label="Buscar productos" aria-expanded="false">${ICONOS.buscar}</button>
          <a class="btn btn--whatsapp" href="${enlaceWhatsApp("Hola K'FE, quiero información de sus productos.")}" target="_blank" rel="noopener">${ICONOS.whatsapp} Escríbenos</a>
          <button class="icono-btn menu-toggle" type="button" aria-label="Abrir menú" aria-controls="menu" aria-expanded="false">${ICONOS.menu}</button>
        </div>
      </nav>
      <div class="buscador" id="buscador">
        <form class="contenedor" action="search.html" role="search">
          <input type="search" name="q" placeholder="Busca camisetas, polos, pijamas..." aria-label="Buscar productos" required>
          <button class="btn btn--primario" type="submit">Buscar</button>
        </form>
      </div>
    </header>
    <div class="velo"></div>`;

  const menu = document.getElementById("menu");
  const velo = document.querySelector(".velo");
  const toggle = document.querySelector(".menu-toggle");
  const abrir = (estado) => {
    menu.classList.toggle("abierto", estado);
    velo.classList.toggle("visible", estado);
    toggle.setAttribute("aria-expanded", estado);
  };
  toggle.addEventListener("click", () => abrir(true));
  velo.addEventListener("click", () => abrir(false));
  document.querySelector(".menu-cerrar").addEventListener("click", () => abrir(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") abrir(false); });

  const btnBuscar = document.querySelector("[data-abrir-busqueda]");
  const buscador = document.getElementById("buscador");
  btnBuscar.addEventListener("click", () => {
    const abierto = buscador.classList.toggle("abierto");
    btnBuscar.setAttribute("aria-expanded", abierto);
    if (abierto) buscador.querySelector("input").focus();
  });
}

function crearPie() {
  const destino = document.querySelector("[data-pie]");
  if (!destino) return;
  const anio = new Date().getFullYear();
  destino.outerHTML = `
    <footer class="pie">
      <div class="contenedor">
        <div class="pie__grid">
          <div>
            ${marcaHTML()}
            <p>Fabricantes de ropa en ${NEGOCIO.ciudad}, en el corazón del clúster de la moda. Más de ${NEGOCIO.anosExperiencia} años confeccionando prendas cómodas, bien terminadas y a precio de fábrica.</p>
            <div class="redes">
              <a href="${NEGOCIO.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONOS.instagram}</a>
              <a href="${NEGOCIO.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICONOS.facebook}</a>
              <a href="${enlaceWhatsApp("Hola K'FE")}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONOS.whatsapp}</a>
            </div>
          </div>
          <div>
            <h4>Catálogo</h4>
            <ul>
              <li><a href="mujer.html">Mujer</a></li>
              <li><a href="hombre.html">Hombre</a></li>
              <li><a href="pijamas.html">Pijamas</a></li>
              <li><a href="jeans.html">Jeans</a></li>
              <li><a href="catalogo.html">Catálogo completo</a></li>
            </ul>
          </div>
          <div>
            <h4>Empresa</h4>
            <ul>
              <li><a href="mayoristas.html">Ventas al por mayor</a></li>
              <li><a href="index.html#nosotros">Nuestra fábrica</a></li>
              <li><a href="index.html#preguntas">Preguntas frecuentes</a></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li><a href="${enlaceWhatsApp("Hola K'FE")}" target="_blank" rel="noopener">WhatsApp: ${NEGOCIO.telefonoVisible}</a></li>
              <li><a href="mailto:${NEGOCIO.email}">${NEGOCIO.email}</a></li>
              <li>${NEGOCIO.ciudad}</li>
              <li>Pagos: transferencia o Nequi</li>
              <li>Envíos a toda Colombia</li>
            </ul>
          </div>
        </div>
        <div class="pie__base">
          <span>© ${anio} ${NEGOCIO.nombre}. Hecho en Colombia.</span>
          <span>Precios al detal en pesos colombianos (COP).</span>
        </div>
      </div>
    </footer>
    <a class="wa-flotante" href="${enlaceWhatsApp("Hola K'FE, vengo de la página web y quiero información.")}" target="_blank" rel="noopener" aria-label="Chatea con un asesor por WhatsApp">
      ${ICONOS.whatsapp}<span>¿Te asesoramos?</span>
    </a>`;
}

/* Tarjeta de producto reutilizable */
function crearTarjeta(p) {
  const cat = CATEGORIAS[p.categoria];
  const msg = p.reventa
    ? `Hola K'FE, me interesa: ${p.nombre} (ref. ${p.id}). ¿Me comparten precio, disponibilidad y tallas?`
    : `Hola K'FE, me interesa: ${p.nombre} (ref. ${p.id}). ¿Está disponible? ¿Me comparten precio por mayor y tallas?`;
  return `
    <article class="producto revelar">
      <a href="article.html?id=${encodeURIComponent(p.id)}" class="producto__media">
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" width="600" height="750">
        <span class="producto__badges">
          ${DESTACADOS_INICIO.includes(p.id) ? '<span class="producto__badge">Más pedido</span>' : ""}
          <span class="producto__badge producto__badge--mayor">${p.reventa ? "De marca" : "Por mayor"}</span>
        </span>
      </a>
      <div class="producto__cuerpo">
        <span class="producto__cat">${cat ? cat.nombre : ""} · ${p.tela || p.tipo}</span>
        <h3 class="producto__nombre"><a href="article.html?id=${encodeURIComponent(p.id)}">${p.nombre}</a></h3>
        <div class="producto__precio">${p.precio == null ? "<strong>Consultar precio</strong>" : `<strong>${formatoCOP(p.precio)}</strong><small>al detal</small>`}</div>
        <span class="producto__mayor">${ICONOS.etiqueta} ${p.reventa ? "Consulta precio y disponibilidad" : "Por mayor: precio de fábrica, consultar"}</span>
        <div class="producto__acciones">
          <a class="btn btn--ver" href="article.html?id=${encodeURIComponent(p.id)}">Ver detalles</a>
          <a class="btn btn--whatsapp" href="${enlaceWhatsApp(msg)}" target="_blank" rel="noopener" aria-label="Consultar disponibilidad de ${p.nombre} por WhatsApp" title="Consultar disponibilidad">${ICONOS.whatsapp}</a>
        </div>
      </div>
    </article>`;
}

/* Nota importante de compra: <div data-nota-compra></div> */
function notaCompraHTML() {
  return `
    <aside class="nota-compra" aria-label="Nota importante antes de comprar">
      <div class="nota-compra__titulo">
        <span class="nota-compra__icono">${ICONOS.reloj}</span>
        <div><strong>Nota importante antes de comprar</strong><span>Las prendas pueden agotarse rápidamente.</span></div>
      </div>
      <ul class="nota-compra__lista">
        <li>${ICONOS.chat}<span><b>Consulta siempre la disponibilidad</b> por WhatsApp antes de pagar.</span></li>
        <li>${ICONOS.camion}<span><b>Envíos a toda Colombia.</b> El valor del envío lo paga el cliente.</span></li>
        <li>${ICONOS.pago}<span><b>Pagos por transferencia o Nequi.</b> Te enviamos los datos al confirmar tu pedido.</span></li>
      </ul>
      <a class="btn btn--whatsapp" href="${enlaceWhatsApp("Hola K'FE, quiero consultar la disponibilidad de unas prendas.")}" target="_blank" rel="noopener">${ICONOS.whatsapp} Consultar disponibilidad</a>
    </aside>`;
}
function pintarNotas() {
  document.querySelectorAll("[data-nota-compra]").forEach((el) => { el.outerHTML = notaCompraHTML(); });
}

/* Aparición suave al hacer scroll */
function activarRevelado() {
  const elementos = document.querySelectorAll(".revelar:not(.visible)");
  if (!("IntersectionObserver" in window)) { elementos.forEach((el) => el.classList.add("visible")); return; }
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  elementos.forEach((el) => obs.observe(el));
}

/* Pinta enlaces de WhatsApp declarados en HTML con data-wa="mensaje" */
function activarEnlacesWhatsApp() {
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = enlaceWhatsApp(a.dataset.wa);
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll("[data-icono]").forEach((el) => {
    el.insertAdjacentHTML("afterbegin", ICONOS[el.dataset.icono] || "");
  });
}

crearCabecera();
crearPie();
pintarNotas();
activarEnlacesWhatsApp();
document.addEventListener("DOMContentLoaded", activarRevelado);

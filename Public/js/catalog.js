/* =========================================================
   K'FE — Catálogo por categoría y búsqueda
   Uso: <body data-categoria="mujer"> o search.html?q=texto
   ========================================================= */
(function () {
  const grid = document.getElementById("grid-productos");
  if (!grid) return;

  const categoria = document.body.dataset.categoria || null;
  const params = new URLSearchParams(location.search);
  const consulta = (params.get("q") || "").trim();
  const chipsCont = document.getElementById("chips");
  const orden = document.getElementById("orden");
  const contador = document.getElementById("contador");

  const normalizar = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  let base = PRODUCTOS.slice();
  if (categoria) base = base.filter((p) => p.categoria === categoria);
  if (consulta) {
    const q = normalizar(consulta);
    base = base.filter((p) => normalizar(`${p.nombre} ${p.tipo} ${p.tela} ${CATEGORIAS[p.categoria].nombre}`).includes(q));
    const titulo = document.getElementById("titulo-busqueda");
    if (titulo) titulo.textContent = `“${consulta}”`;
    const input = document.querySelector('.buscador input[name="q"]');
    if (input) input.value = consulta;
  }

  let filtro = "Todos";

  function pintarChips() {
    if (!chipsCont) return;
    const tipos = ["Todos", ...new Set(base.map((p) => p.tipo))];
    if (tipos.length <= 2) { chipsCont.innerHTML = ""; return; }
    chipsCont.innerHTML = tipos
      .map((t) => `<button type="button" class="chip ${t === filtro ? "activo" : ""}" data-tipo="${t}" aria-pressed="${t === filtro}">${t}</button>`)
      .join("");
  }

  function pintar() {
    let lista = filtro === "Todos" ? base.slice() : base.filter((p) => p.tipo === filtro);
    const criterio = orden ? orden.value : "destacados";
    if (criterio === "menor") lista.sort((a, b) => a.precio - b.precio);
    else if (criterio === "mayor") lista.sort((a, b) => b.precio - a.precio);
    else lista.sort((a, b) => (b.destacado === true) - (a.destacado === true));

    if (contador) contador.textContent = `${lista.length} ${lista.length === 1 ? "referencia" : "referencias"}`;

    if (!lista.length) {
      const nombreCat = categoria ? CATEGORIAS[categoria].nombre.toLowerCase() : "esa búsqueda";
      const barra = document.querySelector(".barra-filtros");
      if (barra) barra.remove();
      if (contador) contador.remove();
      grid.outerHTML = `
        <div class="vacio" id="grid-productos">
          <h2>${consulta ? "No encontramos resultados" : "Nueva colección en camino"}</h2>
          <p>${consulta
            ? "Prueba con otra palabra (camiseta, polo, pijama) o pídenos lo que buscas: fabricamos por pedido."
            : `Estamos preparando las fotos de ${nombreCat}. Escríbenos y te enviamos el catálogo completo con precios por mayor hoy mismo.`}</p>
          <a class="btn btn--whatsapp" href="${enlaceWhatsApp(consulta
            ? `Hola K'FE, estoy buscando: ${consulta}. ¿Lo tienen o lo fabrican?`
            : `Hola K'FE, quiero el catálogo de ${nombreCat} con precios por mayor.`)}" target="_blank" rel="noopener">${ICONOS.whatsapp} Pedir catálogo por WhatsApp</a>
        </div>`;
      return;
    }
    grid.innerHTML = lista.map(crearTarjeta).join("");
    activarRevelado();
  }

  if (chipsCont) {
    chipsCont.addEventListener("click", (e) => {
      const b = e.target.closest("[data-tipo]");
      if (!b) return;
      filtro = b.dataset.tipo;
      pintarChips();
      pintar();
    });
  }
  if (orden) orden.addEventListener("change", pintar);

  pintarChips();
  pintar();
})();

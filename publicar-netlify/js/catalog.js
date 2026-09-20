/* =========================================================
   K'FE — Catálogo por categoría, catálogo completo y búsqueda
   Uso: <body data-categoria="mujer">, catalogo.html (?cat=pijamas)
        o search.html?q=texto
   ========================================================= */
(function () {
  const grid = document.getElementById("grid-productos");
  if (!grid) return;

  const params = new URLSearchParams(location.search);
  const catalogoCompleto = document.body.dataset.pagina === "catalogo";
  let categoria = document.body.dataset.categoria || (catalogoCompleto ? params.get("cat") : null) || null;
  const consulta = (params.get("q") || "").trim();
  const chipsCat = document.getElementById("chips-categorias");
  const chipsCont = document.getElementById("chips");
  const orden = document.getElementById("orden");
  const contador = document.getElementById("contador");

  const normalizar = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  if (consulta) {
    const titulo = document.getElementById("titulo-busqueda");
    if (titulo) titulo.textContent = `“${consulta}”`;
    const input = document.querySelector('.buscador input[name="q"]');
    if (input) input.value = consulta;
  }

  let filtro = "Todos";

  function base() {
    let lista = PRODUCTOS.slice();
    if (categoria) lista = lista.filter((p) => p.categoria === categoria || (p.tambienEn || []).includes(categoria));
    if (consulta) {
      const q = normalizar(consulta);
      lista = lista.filter((p) => normalizar(`${p.nombre} ${p.tipo} ${p.tela} ${CATEGORIAS[p.categoria].nombre}`).includes(q));
    }
    return lista;
  }

  function pintarChipsCategorias() {
    if (!chipsCat) return;
    const cats = Object.keys(CATEGORIAS).filter((k) => PRODUCTOS.some((p) => p.categoria === k));
    chipsCat.innerHTML = [["", "Todo"], ...cats.map((k) => [k, CATEGORIAS[k].nombre])]
      .map(([k, n]) => {
        const cant = k ? PRODUCTOS.filter((p) => p.categoria === k).length : PRODUCTOS.length;
        const activo = (categoria || "") === k;
        return `<button type="button" class="chip ${activo ? "activo" : ""}" data-cat="${k}" aria-pressed="${activo}">${n} <small>(${cant})</small></button>`;
      }).join("");
  }

  function pintarChips() {
    if (!chipsCont) return;
    const tipos = ["Todos", ...new Set(base().map((p) => p.tipo))];
    if (tipos.length <= 2) { chipsCont.innerHTML = ""; return; }
    chipsCont.innerHTML = tipos
      .map((t) => `<button type="button" class="chip ${t === filtro ? "activo" : ""}" data-tipo="${t}" aria-pressed="${t === filtro}">${t}</button>`)
      .join("");
  }

  function pintar() {
    const todos = base();
    let lista = filtro === "Todos" ? todos.slice() : todos.filter((p) => p.tipo === filtro);
    const criterio = orden ? orden.value : "destacados";
    const pr = (x, d) => (x.precio == null ? d : x.precio);
    if (criterio === "menor") lista.sort((a, b) => pr(a, Infinity) - pr(b, Infinity));
    else if (criterio === "mayor") lista.sort((a, b) => pr(b, -1) - pr(a, -1));
    else {
      const rango = (x) => { const i = DESTACADOS_INICIO.indexOf(x.id); return i >= 0 ? i : (x.destacado ? 100 : 200); };
      lista.sort((a, b) => rango(a) - rango(b));
    }

    if (contador) contador.textContent = `${lista.length} ${lista.length === 1 ? "referencia" : "referencias"}`;

    if (!lista.length) {
      const nombreCat = categoria ? CATEGORIAS[categoria].nombre.toLowerCase() : "esa búsqueda";
      grid.className = "";
      grid.innerHTML = `
        <div class="vacio">
          <h2>${consulta ? "No encontramos resultados" : "Nueva colección en camino"}</h2>
          <p>${consulta
            ? "Prueba con otra palabra (camiseta, polo, pijama, jean) o pídenos lo que buscas: fabricamos por pedido."
            : `Estamos preparando las fotos de ${nombreCat}. Escríbenos y te enviamos el catálogo con precios por mayor.`}</p>
          <a class="btn btn--whatsapp" href="${enlaceWhatsApp(consulta
            ? `Hola K'FE, estoy buscando: ${consulta}. ¿Lo tienen o lo fabrican?`
            : `Hola K'FE, quiero el catálogo de ${nombreCat} con precios por mayor.`)}" target="_blank" rel="noopener">${ICONOS.whatsapp} Pedir catálogo por WhatsApp</a>
        </div>`;
      return;
    }
    grid.className = "grid-productos";
    grid.innerHTML = lista.map(crearTarjeta).join("");
    activarRevelado();
  }

  if (chipsCat) {
    chipsCat.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]");
      if (!b) return;
      categoria = b.dataset.cat || null;
      filtro = "Todos";
      const url = new URL(location.href);
      if (categoria) url.searchParams.set("cat", categoria); else url.searchParams.delete("cat");
      history.replaceState(null, "", url);
      pintarChipsCategorias(); pintarChips(); pintar();
    });
  }
  if (chipsCont) {
    chipsCont.addEventListener("click", (e) => {
      const b = e.target.closest("[data-tipo]");
      if (!b) return;
      filtro = b.dataset.tipo;
      pintarChips(); pintar();
    });
  }
  if (orden) orden.addEventListener("change", pintar);

  const btnPdf = document.getElementById("descargar-pdf");
  if (btnPdf) btnPdf.addEventListener("click", () => {
    document.querySelectorAll(".producto img").forEach((i) => (i.loading = "eager"));
    setTimeout(() => window.print(), 300);
  });

  pintarChipsCategorias();
  pintarChips();
  pintar();
})();

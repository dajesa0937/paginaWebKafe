/* =========================================================
   K'FE — Detalle de producto (article.html?id=...)
   ========================================================= */
(function () {
  const cont = document.getElementById("detalle");
  if (!cont) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = PRODUCTOS.find((x) => x.id === id);

  if (!p) {
    cont.innerHTML = `
      <div class="vacio" style="grid-column:1/-1">
        <h2>Este producto ya no está disponible</h2>
        <p>Puede que la referencia se haya agotado. Mira el catálogo actualizado o pregúntanos por algo similar.</p>
        <a class="btn btn--primario" href="index.html#catalogo">Ver catálogo</a>
      </div>`;
    return;
  }

  const cat = CATEGORIAS[p.categoria];
  document.title = `${p.nombre} | K'FE Confecciones`;
  document.getElementById("migas").innerHTML =
    `<a href="index.html">Inicio</a> / <a href="${cat.url}">${cat.nombre}</a> / ${p.nombre}`;

  cont.innerHTML = `
    <div class="detalle__foto"><img src="${p.imagen}" alt="${p.nombre}" width="600" height="750"></div>
    <div>
      <span class="eyebrow">${cat.nombre} · ${p.tipo}</span>
      <h1>${p.nombre}</h1>
      <p class="detalle__desc">Confección propia en ${p.tela.toLowerCase()}, con acabados cuidados y tallaje pensado para el cuerpo colombiano. Disponible por unidad o por mayor con surtido de tallas y diseños.</p>

      <div class="precios">
        <div class="precio-caja">
          <small>Precio al detal</small>
          <strong>${formatoCOP(p.precio)}</strong>
          <span>por unidad</span>
        </div>
        <div class="precio-caja precio-caja--mayor">
          <small>Precio por mayor</small>
          <strong>Precio de fábrica</strong>
          <span>desde ${NEGOCIO.minimoMayor} unidades surtidas</span>
        </div>
      </div>

      <div class="selector">
        <label>¿Cómo quieres comprar?</label>
        <div class="tipo-compra" role="radiogroup">
          <input type="radio" name="tipo" id="t-mayor" value="mayor" checked>
          <label for="t-mayor">Por mayor<small>Para revender · mejor precio</small></label>
          <input type="radio" name="tipo" id="t-detal" value="detal">
          <label for="t-detal">Al detal<small>Para uso personal</small></label>
        </div>
      </div>

      <div class="selector">
        <label for="cantidad">Cantidad</label>
        <div class="cantidad">
          <button type="button" data-paso="-1" aria-label="Menos">−</button>
          <input id="cantidad" type="number" min="1" value="${NEGOCIO.minimoMayor}" inputmode="numeric">
          <button type="button" data-paso="1" aria-label="Más">+</button>
        </div>
        <p class="nota-mayor" id="nota" aria-live="polite"></p>
      </div>

      <a class="btn btn--whatsapp btn--bloque" id="pedir" target="_blank" rel="noopener">${ICONOS.whatsapp} Pedir por WhatsApp</a>

      <ul class="garantias">
        <li>${ICONOS.fabrica} Directo de fábrica, sin intermediarios</li>
        <li>${ICONOS.escudo} Revisamos cada prenda antes de despacharla</li>
        <li>${ICONOS.camion} Despachos a todo el país — te cotizamos el envío</li>
      </ul>
    </div>`;

  const input = document.getElementById("cantidad");
  const nota = document.getElementById("nota");
  const pedir = document.getElementById("pedir");
  const radios = cont.querySelectorAll('input[name="tipo"]');

  function actualizar() {
    let n = Math.max(1, parseInt(input.value, 10) || 1);
    input.value = n;
    const tipo = cont.querySelector('input[name="tipo"]:checked').value;
    if (tipo === "mayor" && n < NEGOCIO.minimoMayor) {
      nota.textContent = `Te faltan ${NEGOCIO.minimoMayor - n} unidades para el precio por mayor.`;
    } else if (tipo === "mayor") {
      const nivel = [...NIVELES_MAYOR].reverse().find((l) => n >= l.desde);
      nota.textContent = nivel ? `✓ Aplicas a precio nivel ${nivel.nombre}.` : "";
    } else {
      nota.textContent = n >= NEGOCIO.minimoMayor ? `Con ${n} unidades ya puedes acceder al precio por mayor.` : "";
    }
    const msg = tipo === "mayor"
      ? `Hola K'FE 👋 Quiero comprar POR MAYOR:\n• ${p.nombre} (ref. ${p.id})\n• Cantidad: ${n} unidades\n¿Me comparten el precio por mayor, tallas y colores disponibles?`
      : `Hola K'FE 👋 Quiero comprar:\n• ${p.nombre} (ref. ${p.id})\n• Cantidad: ${n}\n• Precio detal: ${formatoCOP(p.precio)}\n¿Qué tallas tienen disponibles?`;
    pedir.href = enlaceWhatsApp(msg);
  }

  cont.querySelectorAll("[data-paso]").forEach((b) =>
    b.addEventListener("click", () => { input.value = (parseInt(input.value, 10) || 1) + Number(b.dataset.paso); actualizar(); }));
  input.addEventListener("input", actualizar);
  radios.forEach((r) => r.addEventListener("change", () => {
    if (r.value === "detal" && r.checked && Number(input.value) === NEGOCIO.minimoMayor) input.value = 1;
    if (r.value === "mayor" && r.checked && Number(input.value) < NEGOCIO.minimoMayor) input.value = NEGOCIO.minimoMayor;
    actualizar();
  }));
  actualizar();

  // Relacionados
  const rel = PRODUCTOS.filter((x) => x.categoria === p.categoria && x.id !== p.id).slice(0, 4);
  const relCont = document.getElementById("relacionados");
  if (rel.length && relCont) {
    relCont.innerHTML = rel.map(crearTarjeta).join("");
    activarRevelado();
  } else if (relCont) {
    relCont.closest("section").remove();
  }
})();

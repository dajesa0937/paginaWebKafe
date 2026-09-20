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
  const fotos = [p.imagen, ...(p.imagenes || [])];
  document.title = `${p.nombre} | Inversiones K'FE Designs`;
  document.getElementById("migas").innerHTML =
    `<a href="index.html">Inicio</a> / <a href="${cat.url}">${cat.nombre}</a> / ${p.nombre}`;

  cont.innerHTML = `
    <div class="detalle__foto">
      <img id="foto-principal" src="${p.imagen}" alt="${p.nombre}" width="600" height="750">
      ${fotos.length > 1 ? `<div class="miniaturas">${fotos.map((f, i) => `<button type="button" class="${i === 0 ? "activa" : ""}" data-foto="${f}" aria-label="Ver foto ${i + 1}"><img src="${f}" alt=""></button>`).join("")}</div>` : ""}
    </div>
    <div>
      <span class="eyebrow">${cat.nombre} · ${p.tipo}</span>
      <h1>${p.nombre}</h1>
      <p class="detalle__desc">${p.reventa
        ? "Jean de marca para hombre. Tenemos unidades y tallas limitadas: consulta precio, tallas y disponibilidad por WhatsApp antes de comprar."
        : `Confección propia en ${p.tela.toLowerCase()}, con acabados cuidados y tallaje pensado para el cuerpo colombiano. Disponible por unidad o por mayor con surtido de tallas y diseños.`}</p>

      ${p.reventa ? `
      <div class="precios"><div class="precio-caja precio-caja--mayor" style="grid-column:1/-1">
        <small>Precio y disponibilidad</small>
        <strong>Consultar</strong>
        <span>te lo confirmamos por WhatsApp según talla y referencia</span>
      </div></div>` : `
      <div class="precios">
        <div class="precio-caja">
          <small>Precio al detal</small>
          <strong>${p.precio == null ? "Consultar" : formatoCOP(p.precio)}</strong>
          <span>${p.precio == null ? "te lo confirmamos por WhatsApp" : "por unidad"}</span>
        </div>
        <div class="precio-caja precio-caja--mayor">
          <small>Precio por mayor</small>
          <strong>Consultar</strong>
          <span>precio de fábrica desde ${NEGOCIO.minimoMayor} unidades surtidas</span>
        </div>
      </div>`}

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

      <a class="btn btn--whatsapp btn--bloque" id="pedir" target="_blank" rel="noopener">${ICONOS.whatsapp} Consultar disponibilidad y pedir</a>

      ${notaCompraHTML()}

      <ul class="garantias">
        ${p.reventa ? "" : `<li>${ICONOS.fabrica} Directo de fábrica, sin intermediarios</li>`}
        <li>${ICONOS.escudo} Revisamos cada prenda antes de despacharla</li>
      </ul>
    </div>`;

  cont.querySelectorAll("[data-foto]").forEach((b) => b.addEventListener("click", () => {
    document.getElementById("foto-principal").src = b.dataset.foto;
    cont.querySelectorAll("[data-foto]").forEach((x) => x.classList.toggle("activa", x === b));
  }));

  if (p.reventa) {
    const sel = cont.querySelector(".tipo-compra");
    if (sel) sel.closest(".selector").remove();
    document.getElementById("cantidad").value = 1;
  }

  const input = document.getElementById("cantidad");
  const nota = document.getElementById("nota");
  const pedir = document.getElementById("pedir");
  const radios = cont.querySelectorAll('input[name="tipo"]');

  function actualizar() {
    let n = Math.max(1, parseInt(input.value, 10) || 1);
    input.value = n;
    const marcado = cont.querySelector('input[name="tipo"]:checked');
    const tipo = marcado ? marcado.value : "detal";
    if (p.reventa) {
      nota.textContent = "";
    } else if (tipo === "mayor" && n < NEGOCIO.minimoMayor) {
      nota.textContent = `Te faltan ${NEGOCIO.minimoMayor - n} unidades para el precio por mayor.`;
    } else if (tipo === "mayor") {
      const nivel = [...NIVELES_MAYOR].reverse().find((l) => n >= l.desde);
      nota.textContent = nivel ? `✓ Aplicas a precio nivel ${nivel.nombre}.` : "";
    } else {
      nota.textContent = n >= NEGOCIO.minimoMayor ? `Con ${n} unidades ya puedes acceder al precio por mayor.` : "";
    }
    const msg = p.reventa
      ? `Hola K'FE 👋 Me interesa:\n• ${p.nombre} (ref. ${p.id})\n• Cantidad: ${n}\n¿Me comparten precio, tallas y disponibilidad?`
      : tipo === "mayor"
      ? `Hola K'FE 👋 Quiero comprar POR MAYOR:\n• ${p.nombre} (ref. ${p.id})\n• Cantidad: ${n} unidades\n¿Está disponible? ¿Me comparten el precio por mayor, tallas y colores?`
      : `Hola K'FE 👋 Quiero comprar:\n• ${p.nombre} (ref. ${p.id})\n• Cantidad: ${n}${p.precio == null ? "" : `\n• Precio detal: ${formatoCOP(p.precio)}`}\n¿Está disponible? ¿Qué tallas tienen?`;
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

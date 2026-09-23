/* =========================================================
   K'FE — Sección pública "Entrega inmediata"
   Lee los productos que el administrador sube desde admin.html
   Requiere: products.js, layout.js y supabase-config.js
   ========================================================= */

async function cargarInmediata() {
  const destino = document.getElementById("grid-inmediata");
  if (!destino) return;
  const estado = document.getElementById("estado-inmediata");
  const seccion = destino.closest("[data-seccion-inmediata]");
  const limite = Number(destino.dataset.limite || 0);

  const vacio = (mensaje) => {
    if (estado) estado.remove();
    if (seccion && seccion.dataset.ocultarSiVacio === "si") { seccion.remove(); return; }
    destino.className = "";
    destino.innerHTML = `
      <div class="vacio">
        <h2>Aún no hay productos publicados</h2>
        <p>${mensaje}</p>
        <a class="btn btn--whatsapp" href="${enlaceWhatsApp("Hola K'FE, quiero saber qué tienen disponible para entrega inmediata.")}" target="_blank" rel="noopener">${ICONOS.whatsapp} Preguntar por WhatsApp</a>
      </div>`;
  };

  if (!SUPABASE_LISTO) {
    vacio("Escríbenos por WhatsApp y te contamos qué tenemos listo para despacho hoy.");
    return;
  }

  try {
    const cliente = await cargarSupabase();
    let consulta = cliente
      .from(SUPABASE_CONFIG.tabla)
      .select("*")
      .eq("activo", true)
      .order("orden", { ascending: true })
      .order("creado", { ascending: false });
    if (limite) consulta = consulta.limit(limite);
    const { data, error } = await consulta;
    if (error) throw error;

    if (estado) estado.remove();
    if (!data || !data.length) { vacio("Estamos surtiendo la bodega. Escríbenos y te avisamos apenas entre mercancía."); return; }

    destino.className = "grid-productos";
    destino.innerHTML = data.map(tarjetaInmediata).join("");
    activarRevelado();

    const contador = document.getElementById("contador-inmediata");
    if (contador) contador.textContent = `${data.length} ${data.length === 1 ? "producto listo" : "productos listos"} para despachar`;
  } catch (e) {
    console.error(e);
    vacio("No pudimos cargar la lista en este momento. Escríbenos y te contamos qué hay disponible.");
  }
}

function tarjetaInmediata(p) {
  const precio = p.precio ? formatoCOP(p.precio) : "Consultar precio";
  const pocas = Number.isFinite(p.cantidad) && p.cantidad !== null && p.cantidad > 0 && p.cantidad <= 5;
  const msg = `Hola K'FE 👋 Quiero este producto de ENTREGA INMEDIATA:\n• ${p.nombre}${p.precio ? `\n• Precio: ${formatoCOP(p.precio)}` : ""}\n¿Sigue disponible?`;
  return `
    <article class="producto">
      <div class="producto__media">
        <img src="${p.foto_url || "img/opt/camiseta-dama-vive-simple.jpg"}" alt="${p.nombre}" loading="lazy" width="600" height="750">
        <span class="producto__badges">
          <span class="producto__badge producto__badge--inmediata">Entrega inmediata</span>
          ${pocas ? `<span class="producto__badge producto__badge--pocas">¡Quedan ${p.cantidad}!</span>` : ""}
        </span>
      </div>
      <div class="producto__cuerpo">
        <span class="producto__cat">${p.categoria || "Disponible hoy"}</span>
        <h3 class="producto__nombre">${p.nombre}</h3>
        ${p.descripcion ? `<p class="producto__desc">${p.descripcion}</p>` : ""}
        <div class="producto__precio"><strong>${precio}</strong>${p.precio ? "<small>al detal</small>" : ""}</div>
        <span class="producto__mayor">${ICONOS.camion} Despacho inmediato a todo el país</span>
        <div class="producto__acciones">
          <a class="btn btn--whatsapp btn--bloque" href="${enlaceWhatsApp(msg)}" target="_blank" rel="noopener">${ICONOS.whatsapp} Lo quiero</a>
        </div>
      </div>
    </article>`;
}

document.addEventListener("DOMContentLoaded", cargarInmediata);

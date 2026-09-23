/* =========================================================
   K'FE — Panel de administración (admin.html)
   Login con Supabase, subida de fotos y gestión de productos
   de la sección "Entrega inmediata".
   ========================================================= */
(function () {
  const $ = (id) => document.getElementById(id);
  const pantallaConfig = $("pantalla-config");
  const pantallaLogin = $("pantalla-login");
  const pantallaPanel = $("pantalla-panel");
  let cliente = null;
  let editandoId = null;
  let fotoNueva = null;   // { blob, dataUrl }

  const aviso = (texto, tipo = "ok") => {
    const caja = $("aviso");
    caja.textContent = texto;
    caja.className = `aviso aviso--${tipo} visible`;
    clearTimeout(caja._t);
    caja._t = setTimeout(() => caja.classList.remove("visible"), 4500);
  };

  /* ---------- 1. Arranque ---------- */
  async function iniciar() {
    if (!SUPABASE_LISTO) { pantallaConfig.hidden = false; return; }
    try {
      cliente = await cargarSupabase();
    } catch (e) {
      pantallaConfig.hidden = false;
      return;
    }
    const { data } = await cliente.auth.getSession();
    if (data.session) abrirPanel(data.session.user);
    else pantallaLogin.hidden = false;
  }

  /* ---------- 2. Ingreso ---------- */
  $("form-login").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = $("btn-entrar");
    btn.disabled = true; btn.textContent = "Entrando...";
    const { data, error } = await cliente.auth.signInWithPassword({
      email: $("correo").value.trim(),
      password: $("clave").value
    });
    btn.disabled = false; btn.textContent = "Entrar";
    if (error) { $("error-login").textContent = "Correo o contraseña incorrectos."; return; }
    $("error-login").textContent = "";
    abrirPanel(data.user);
  });

  function abrirPanel(usuario) {
    pantallaLogin.hidden = true;
    pantallaPanel.hidden = false;
    $("usuario-actual").textContent = usuario.email;
    listar();
  }

  $("btn-salir").addEventListener("click", async () => {
    await cliente.auth.signOut();
    location.reload();
  });

  /* ---------- 3. Foto: se ajusta sin deformar ni recortar ----------
     La imagen se centra completa dentro de un lienzo 4:5 y el fondo se
     rellena con una versión difuminada de la misma foto. Así ninguna
     prenda queda cortada y todas las tarjetas quedan del mismo tamaño. */
  const LIENZO_W = 1000, LIENZO_H = 1250;

  function procesarFoto(archivo) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const lienzo = document.createElement("canvas");
        lienzo.width = LIENZO_W; lienzo.height = LIENZO_H;
        const ctx = lienzo.getContext("2d");

        // Fondo: la misma foto ampliada y difuminada (se ve alegre, no vacío)
        const escalaFondo = Math.max(LIENZO_W / img.width, LIENZO_H / img.height) * 1.25;
        const fw = img.width * escalaFondo, fh = img.height * escalaFondo;
        ctx.filter = "blur(28px) brightness(1.06) saturate(1.1)";
        ctx.drawImage(img, (LIENZO_W - fw) / 2, (LIENZO_H - fh) / 2, fw, fh);
        ctx.filter = "none";
        ctx.fillStyle = "rgba(247,241,232,.35)";
        ctx.fillRect(0, 0, LIENZO_W, LIENZO_H);

        // Foto completa, centrada y sin deformar
        const escala = Math.min(LIENZO_W / img.width, LIENZO_H / img.height);
        const w = img.width * escala, h = img.height * escala;
        ctx.drawImage(img, (LIENZO_W - w) / 2, (LIENZO_H - h) / 2, w, h);

        lienzo.toBlob((blob) => {
          if (!blob) return reject(new Error("No se pudo procesar la foto"));
          resolve({ blob, dataUrl: lienzo.toDataURL("image/jpeg", 0.7) });
        }, "image/jpeg", 0.86);
      };
      img.onerror = () => reject(new Error("Archivo de imagen no válido"));
      img.src = URL.createObjectURL(archivo);
    });
  }

  $("foto").addEventListener("change", async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    if (!archivo.type.startsWith("image/")) { aviso("Ese archivo no es una foto.", "error"); return; }
    $("previsualizacion").innerHTML = '<div class="cargando">Preparando la foto...</div>';
    try {
      fotoNueva = await procesarFoto(archivo);
      $("previsualizacion").innerHTML = `<img src="${fotoNueva.dataUrl}" alt="Vista previa"><span>Así se verá en la página</span>`;
    } catch (err) {
      fotoNueva = null;
      $("previsualizacion").innerHTML = "";
      aviso("No pudimos leer esa foto. Intenta con otra.", "error");
    }
  });

  /* ---------- 4. Guardar producto ---------- */
  $("form-producto").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = $("btn-guardar");
    const nombre = $("nombre").value.trim();
    if (!nombre) { aviso("Escribe el nombre del producto.", "error"); return; }
    if (!editandoId && !fotoNueva) { aviso("Agrega una foto del producto.", "error"); return; }

    btn.disabled = true; btn.textContent = "Guardando...";
    try {
      let foto_url = $("foto-actual").value || null;
      if (fotoNueva) {
        const nombreArchivo = `inmediata/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
        const { error: errSubida } = await cliente.storage
          .from(SUPABASE_CONFIG.bucket)
          .upload(nombreArchivo, fotoNueva.blob, { contentType: "image/jpeg", upsert: false });
        if (errSubida) throw errSubida;
        foto_url = cliente.storage.from(SUPABASE_CONFIG.bucket).getPublicUrl(nombreArchivo).data.publicUrl;
      }

      const fila = {
        nombre,
        descripcion: $("descripcion").value.trim() || null,
        precio: $("precio").value ? parseInt($("precio").value, 10) : null,
        cantidad: $("cantidad").value ? parseInt($("cantidad").value, 10) : null,
        categoria: $("categoria").value,
        activo: $("activo").checked,
        foto_url
      };

      const tabla = cliente.from(SUPABASE_CONFIG.tabla);
      const { error } = editandoId ? await tabla.update(fila).eq("id", editandoId) : await tabla.insert(fila);
      if (error) throw error;

      aviso(editandoId ? "Producto actualizado." : "Producto publicado. Ya se ve en la página.");
      limpiarFormulario();
      listar();
    } catch (err) {
      console.error(err);
      aviso("No se pudo guardar: " + (err.message || "error desconocido"), "error");
    } finally {
      btn.disabled = false; btn.textContent = "Publicar producto";
    }
  });

  function limpiarFormulario() {
    editandoId = null; fotoNueva = null;
    $("form-producto").reset();
    $("foto-actual").value = "";
    $("activo").checked = true;
    $("previsualizacion").innerHTML = "";
    $("titulo-form").textContent = "Publicar producto nuevo";
    $("btn-guardar").textContent = "Publicar producto";
    $("btn-cancelar").hidden = true;
  }
  $("btn-cancelar").addEventListener("click", limpiarFormulario);

  /* ---------- 5. Lista de productos ---------- */
  async function listar() {
    const cont = $("lista");
    cont.innerHTML = '<div class="cargando">Cargando productos...</div>';
    const { data, error } = await cliente
      .from(SUPABASE_CONFIG.tabla)
      .select("*")
      .order("orden", { ascending: true })
      .order("creado", { ascending: false });

    if (error) { cont.innerHTML = `<p class="aviso aviso--error visible">${error.message}</p>`; return; }
    $("conteo").textContent = data.length ? `${data.length} producto${data.length === 1 ? "" : "s"}` : "";
    if (!data.length) { cont.innerHTML = '<p class="vacio-admin">Todavía no has publicado productos. Llena el formulario de arriba.</p>'; return; }

    cont.innerHTML = data.map((p) => `
      <article class="fila ${p.activo ? "" : "fila--oculta"}">
        <img src="${p.foto_url || ""}" alt="">
        <div class="fila__datos">
          <h3>${p.nombre}</h3>
          <p>${p.descripcion || ""}</p>
          <span class="fila__meta">
            ${p.precio ? formatoCOP(p.precio) : "Sin precio"} ·
            ${p.cantidad != null ? `${p.cantidad} und.` : "sin cantidad"} ·
            ${p.categoria || "General"} ·
            ${p.activo ? "<b class='si'>Visible</b>" : "<b class='no'>Oculto</b>"}
          </span>
        </div>
        <div class="fila__acciones">
          <button type="button" class="btn btn--ver" data-editar="${p.id}">Editar</button>
          <button type="button" class="btn btn--ver" data-ver="${p.id}">${p.activo ? "Ocultar" : "Mostrar"}</button>
          <button type="button" class="btn btn--borrar" data-borrar="${p.id}">Borrar</button>
        </div>
      </article>`).join("");

    cont.querySelectorAll("[data-editar]").forEach((b) => b.addEventListener("click", () => editar(data.find((x) => x.id === b.dataset.editar))));
    cont.querySelectorAll("[data-ver]").forEach((b) => b.addEventListener("click", async () => {
      const p = data.find((x) => x.id === b.dataset.ver);
      await cliente.from(SUPABASE_CONFIG.tabla).update({ activo: !p.activo }).eq("id", p.id);
      aviso(p.activo ? "Producto oculto en la página." : "Producto visible en la página.");
      listar();
    }));
    cont.querySelectorAll("[data-borrar]").forEach((b) => b.addEventListener("click", async () => {
      const p = data.find((x) => x.id === b.dataset.borrar);
      if (!confirm(`¿Borrar "${p.nombre}"? Esta acción no se puede deshacer.`)) return;
      const { error: err } = await cliente.from(SUPABASE_CONFIG.tabla).delete().eq("id", p.id);
      if (err) { aviso("No se pudo borrar: " + err.message, "error"); return; }
      aviso("Producto borrado.");
      listar();
    }));
  }

  function editar(p) {
    editandoId = p.id;
    fotoNueva = null;
    $("nombre").value = p.nombre || "";
    $("descripcion").value = p.descripcion || "";
    $("precio").value = p.precio || "";
    $("cantidad").value = p.cantidad ?? "";
    $("categoria").value = p.categoria || "General";
    $("activo").checked = !!p.activo;
    $("foto-actual").value = p.foto_url || "";
    $("previsualizacion").innerHTML = p.foto_url ? `<img src="${p.foto_url}" alt="Foto actual"><span>Foto actual · elige otra solo si quieres cambiarla</span>` : "";
    $("titulo-form").textContent = "Editando: " + p.nombre;
    $("btn-guardar").textContent = "Guardar cambios";
    $("btn-cancelar").hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- 6. Consejos de venta (psicología del consumidor) ---------- */
  const CONSEJOS = [
    "Escribe el nombre como lo busca el cliente: «Pijama short algodón», no «Ref. 445».",
    "En la descripción corta di el beneficio: «Fresca, no se transparenta, talla S a XL».",
    "Si quedan pocas unidades, escribe la cantidad: la página muestra «¡Quedan 3!» y eso acelera la decisión.",
    "Sube la foto con luz de día y fondo despejado: se vende con los ojos.",
    "Publica los productos nuevos temprano y compártelos en tus estados de WhatsApp.",
    "Oculta (no borres) lo que se agotó: así lo vuelves a mostrar cuando entre mercancía.",
    "Un precio con final claro ($25.000) se lee más rápido que uno raro ($24.900)."
  ];
  $("consejo").textContent = CONSEJOS[Math.floor(Math.random() * CONSEJOS.length)];

  iniciar();
})();

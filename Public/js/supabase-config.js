/* =========================================================
   K'FE — Conexión con Supabase (panel de administración)

   PASO ÚNICO DE CONFIGURACIÓN:
   1. Entra a https://supabase.com y crea un proyecto (plan gratuito).
   2. En el proyecto, ve a: Project Settings → API.
   3. Copia "Project URL" y la llave "anon public" y pégalas aquí abajo.
   4. Guarda el archivo y publica la página.

   La llave "anon" es pública y puede verse en el navegador: no es un
   secreto. Lo que protege los datos son las reglas (RLS) que están en
   el archivo supabase-setup.sql. NUNCA pegues aquí la llave
   "service_role": esa sí es secreta.
   ========================================================= */

const SUPABASE_CONFIG = {
  url: "https://xspqadrnlbmosfsqzauf.supabase.co",
  anonKey: "",  // Ejemplo: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."

  // Nombres creados por supabase-setup.sql (no cambiar salvo que los cambies allá)
  tabla: "productos_inmediata",
  bucket: "fotos"
};

const SUPABASE_LISTO = Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);

/* Carga la librería de Supabase solo cuando hace falta */
async function cargarSupabase() {
  if (!SUPABASE_LISTO) return null;
  if (!window.supabase) {
    await new Promise((ok, fail) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
      s.onload = ok;
      s.onerror = () => fail(new Error("No se pudo cargar Supabase"));
      document.head.appendChild(s);
    });
  }
  if (!window._clienteKfe) {
    window._clienteKfe = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
  }
  return window._clienteKfe;
}

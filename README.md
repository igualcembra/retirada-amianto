# 🏗️ Landing Page - Retirada de Amianto

Landing page optimizada para SEO para generación de leads en el sector de retirada de amianto en España.

## 🚀 Stack Tecnológico

- **Astro 4.15** - Framework para sitios web ultrarrápidos
- **Resend** - Envío de emails transaccionales
- **Google Sheets** - Base de datos simple para almacenar leads
- **Vercel** - Hosting y despliegue automático

## ✨ Características

✅ SEO optimizado (Schema Markup, meta tags, sitemap)
✅ Formulario de contacto funcional
✅ Notificaciones por email
✅ Almacenamiento en Google Sheets
✅ Diseño responsive (móvil, tablet, desktop)
✅ Core Web Vitals optimizados
✅ Certificación SSL automática

---

## 📋 INSTRUCCIONES PASO A PASO

### PASO 1: Instalar Node.js

1. Ve a https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Instala con los valores por defecto
4. Abre la terminal (CMD en Windows o Terminal en Mac)
5. Verifica la instalación:
   ```bash
   node --version
   npm --version
   ```

### PASO 2: Instalar Dependencias

1. Abre la terminal en la carpeta del proyecto
2. Ejecuta:
   ```bash
   npm install
   ```
3. Espera a que se descarguen todas las dependencias (puede tardar 1-2 minutos)

### PASO 3: Configurar Resend (Email)

Resend es un servicio gratuito (hasta 100 emails/día) para enviar emails. **Es obligatorio para recibir los leads por email.**

1. Ve a https://resend.com/
2. Crea una cuenta (gratis)
3. Verifica tu email
4. Ve a "API Keys" en el menú lateral
5. Haz clic en "Create API Key"
6. Dale un nombre (ej: "retirada-amianto")
7. Copia la API Key que empieza por `re_...`

### PASO 4: Configurar Google Sheets (Base de Datos)

Google Sheets es gratis y te permite tener una base de datos simple con todos tus leads. **Opcional pero muy recomendado.**

#### 4.1. Crear la Hoja de Cálculo

1. Ve a https://sheets.google.com/
2. Crea una nueva hoja de cálculo
3. Nómbrala "Leads Retirada Amianto"
4. En la primera fila (fila 1), escribe estos encabezados exactamente:
   - A1: `Fecha`
   - B1: `Nombre`
   - C1: `Email`
   - D1: `Teléfono`
   - E1: `Ubicación`
   - F1: `Servicio`
   - G1: `Mensaje`

#### 4.2. Crear el Script de Google Apps

1. En tu hoja de cálculo, ve al menú: **Extensiones → Apps Script**
2. Borra el código que aparece
3. Copia y pega este código:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date(),
      data.nombre || '',
      data.email || '',
      data.telefono || '',
      data.ubicacion || '',
      data.servicio || '',
      data.mensaje || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Haz clic en el icono de **Guardar** (💾)
5. Dale un nombre al proyecto (ej: "Webhook Leads")
6. Haz clic en **Implementar → Nueva implementación**
7. Selecciona el tipo: **Aplicación web**
8. Configuración:
   - **Ejecutar como:** Tu email
   - **Quién tiene acceso:** Cualquier persona
9. Haz clic en **Implementar**
10. Autoriza los permisos (puede que Google te avise que no es una app verificada, haz clic en "Ir a [nombre del script]")
11. **IMPORTANTE:** Copia la URL que aparece (empieza por `https://script.google.com/macros/s/...`)

### PASO 5: Configurar Variables de Entorno

1. En la carpeta raíz del proyecto, crea un archivo llamado `.env` (sin extensión)
2. Copia el contenido de `.env.example` y pégalo en `.env`
3. Reemplaza los valores:

```env
RESEND_API_KEY=re_tu_api_key_aqui
EMAIL_TO=tu_email@example.com
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/XXXXXX/exec
```

**Ejemplo real:**
```env
RESEND_API_KEY=re_abc123def456ghi789
EMAIL_TO=contacto@miamianto.es
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXXXXX/exec
```

### PASO 6: Probar en Local

1. Ejecuta el proyecto en local:
   ```bash
   npm run dev
   ```

2. Abre tu navegador en: http://localhost:4321

3. Prueba el formulario de contacto con datos de prueba

4. Verifica que:
   - Recibes el email en tu bandeja
   - Los datos aparecen en Google Sheets

### PASO 7: Desplegar en Vercel

Vercel es gratis para proyectos personales y ofrece despliegue automático.

#### 7.1. Crear Cuenta en Vercel

1. Ve a https://vercel.com/
2. Regístrate con tu email o GitHub
3. Verifica tu cuenta

#### 7.2. Instalar Vercel CLI (Opcional pero recomendado)

```bash
npm install -g vercel
```

#### 7.3. Desplegar desde la Terminal

1. En la terminal, dentro del proyecto, ejecuta:
   ```bash
   vercel
   ```

2. Sigue las instrucciones:
   - Login con tu cuenta
   - Set up and deploy? **Y**
   - Which scope? (tu usuario)
   - Link to existing project? **N**
   - What's your project's name? **retirada-amianto**
   - In which directory? **./** (presiona Enter)
   - Want to override settings? **N**

3. Espera a que se despliegue (2-3 minutos)

4. Recibirás una URL como: `https://retirada-amianto.vercel.app`

#### 7.4. Configurar Variables de Entorno en Vercel

**MUY IMPORTANTE:** Debes configurar las variables de entorno también en Vercel.

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings → Environment Variables**
4. Añade las 3 variables:
   - `RESEND_API_KEY` = tu_api_key
   - `EMAIL_TO` = tu_email
   - `GOOGLE_SHEETS_URL` = tu_url_de_sheets

5. Haz clic en **Save**

6. Ve a **Deployments** y haz clic en los 3 puntos del último deployment
7. Selecciona **Redeploy** para que cargue las variables

### PASO 8: Configurar Dominio Personalizado (Opcional)

Si tienes un dominio propio:

1. En Vercel, ve a **Settings → Domains**
2. Añade tu dominio (ej: `retirada-amianto.es`)
3. Vercel te dará las instrucciones para configurar los DNS
4. Ve a tu proveedor de dominios (GoDaddy, Namecheap, etc.)
5. Configura los registros DNS como indica Vercel
6. Espera 24-48 horas para la propagación

**IMPORTANTE:** Una vez tengas dominio propio:
- Actualiza la URL en `astro.config.mjs` (línea `site:`)
- Actualiza las URLs en los Schema Markup de `src/pages/index.astro`
- En Resend, verifica tu dominio para enviar desde `contacto@tudominio.es`

---

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `src/layouts/Layout.astro`:

```css
:root {
  --color-primary: #1e40af;     /* Color principal (azul) */
  --color-secondary: #f59e0b;   /* Color secundario (naranja) */
  --color-text: #1f2937;         /* Color del texto */
}
```

### Cambiar Textos

- **Hero:** `src/components/Hero.astro`
- **Servicios:** `src/components/Services.astro`
- **FAQ:** `src/components/FAQ.astro`
- **Footer:** `src/components/Footer.astro`

### Añadir/Modificar Secciones

Cada sección es un componente independiente en `src/components/`.
Edita el componente que necesites y los cambios se reflejarán automáticamente.

---

## 📊 Monitorizar Resultados

### Google Analytics (Recomendado)

1. Crea una cuenta en https://analytics.google.com/
2. Obtén tu ID de medición (ej: `G-XXXXXXXXXX`)
3. Añade este código en `src/layouts/Layout.astro` antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Google Search Console

1. Ve a https://search.google.com/search-console/
2. Añade tu propiedad (dominio)
3. Verifica la propiedad
4. Envía el sitemap: `https://tudominio.com/sitemap-index.xml`

---

## 🔧 Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Crear build de producción
npm run build

# Preview del build
npm run preview

# Desplegar a Vercel
vercel

# Desplegar a producción en Vercel
vercel --prod
```

---

## 📈 Optimizaciones SEO Incluidas

✅ **Schema Markup:**
- LocalBusiness
- Service
- FAQPage
- BreadcrumbList

✅ **Meta Tags:**
- Title y Description optimizados
- Open Graph (Facebook)
- Twitter Cards
- Canonical URLs

✅ **Performance:**
- HTML estático
- CSS minificado
- JavaScript mínimo
- Imágenes lazy loading
- Preconnect a Google Fonts

✅ **Sitemap:**
- Generado automáticamente por Astro
- Accesible en `/sitemap-index.xml`

✅ **Robots.txt:**
- Configurado para permitir crawling
- Enlaza al sitemap

---

## 🐛 Solución de Problemas

### El formulario no envía emails

1. Verifica que `RESEND_API_KEY` está configurada en `.env` y en Vercel
2. Comprueba que la API key es válida en https://resend.com/
3. Revisa los logs de Vercel en el dashboard

### Los datos no se guardan en Google Sheets

1. Verifica que el script de Google Apps está desplegado correctamente
2. Comprueba que `GOOGLE_SHEETS_URL` es correcta
3. Verifica los permisos del script (debe ser accesible por cualquier persona)
4. Revisa los logs del script: Apps Script → Ejecuciones

### Error al desplegar en Vercel

1. Asegúrate de que todas las dependencias están instaladas
2. Ejecuta `npm run build` en local para detectar errores
3. Revisa los logs en el dashboard de Vercel

### La web va lenta

1. Verifica que estás usando la build de producción (`npm run build`)
2. Comprueba Core Web Vitals en https://pagespeed.web.dev/
3. Optimiza imágenes si has añadido nuevas

---

## 📞 Soporte

Si tienes dudas o problemas:

1. **Astro Docs:** https://docs.astro.build/
2. **Resend Docs:** https://resend.com/docs
3. **Vercel Docs:** https://vercel.com/docs

---

## 📄 Licencia

Este proyecto es privado y está creado específicamente para tu negocio de retirada de amianto.

---

## 🎯 Próximos Pasos Recomendados

1. ✅ Desplegar la web en Vercel
2. ✅ Configurar Google Analytics
3. ✅ Registrar en Google Search Console
4. ✅ Crear páginas de servicios específicas (próximo desarrollo)
5. ✅ Añadir blog para contenido SEO (próximo desarrollo)
6. ✅ Implementar páginas de ciudades/provincias (próximo desarrollo)

---

**¡Tu landing page está lista para generar leads! 🚀**

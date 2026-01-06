# 🏗️ Landing Page - Retirada de Amianto

Landing page optimizada para SEO para generación de leads en el sector de retirada de amianto en España.

**🎨 PROTOTIPO VISUAL** - El formulario es funcional pero no envía emails reales (modo demo).

---

## 🚀 Stack Tecnológico

- **Astro 4.15** - Framework para sitios web ultrarrápidos
- **Netlify** - Hosting y despliegue automático (gratis)

---

## ✨ Características

✅ Diseño profesional y responsive
✅ SEO optimizado (Schema Markup, meta tags, sitemap)
✅ Formulario de contacto funcional (modo demo)
✅ Core Web Vitals optimizados
✅ 7 secciones completas (Hero, Servicios, FAQ, etc.)

---

## 📋 INSTRUCCIONES PARA DESPLEGAR

### PASO 1: Desplegar en Netlify (5 minutos)

#### **Opción A: Desde GitHub (Recomendado)**

1. Asegúrate de que tu código esté en GitHub
2. Ve a https://app.netlify.com/
3. Regístrate/Inicia sesión
4. Haz clic en **"Add new site"** → **"Import an existing project"**
5. Conecta con GitHub y selecciona tu repositorio
6. Netlify detectará automáticamente que es un proyecto Astro
7. Configuración (ya está en netlify.toml):
   - Build command: `npm run build`
   - Publish directory: `dist`
8. Haz clic en **"Deploy site"**
9. ¡Listo! Tu web estará en línea en 2-3 minutos

#### **Opción B: Desde la Terminal**

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Desplegar
netlify deploy --prod

# 4. Seguir las instrucciones en pantalla
```

**¡Tu landing page estará en línea con SSL gratis!**

URL ejemplo: `https://retirada-amianto.netlify.app`

---

## 💻 Desarrollo Local

Si quieres ver la web en tu ordenador antes de desplegar:

### 1. Instalar Node.js
- Ve a https://nodejs.org/
- Descarga la versión LTS
- Instala con valores por defecto

### 2. Instalar dependencias
```bash
cd retirada-amianto
npm install
```

### 3. Ejecutar en local
```bash
npm run dev
```

Abre tu navegador en: http://localhost:4321

---

## 🎨 Personalización

### Cambiar Colores

Edita `src/layouts/Layout.astro` (líneas 38-42):

```css
:root {
  --color-primary: #1e40af;     /* Color principal (azul) */
  --color-secondary: #f59e0b;   /* Color secundario (naranja) */
  --color-text: #1f2937;        /* Color del texto */
}
```

### Cambiar Textos

- **Hero y formulario:** `src/components/Hero.astro`
- **Servicios:** `src/components/Services.astro`
- **FAQ:** `src/components/FAQ.astro`
- **Footer:** `src/components/Footer.astro`

### Cambiar Dominio

1. Compra tu dominio (ej: en Namecheap, GoDaddy)
2. En Netlify: **Site settings → Domain management → Add custom domain**
3. Añade tu dominio
4. Configura los DNS según las instrucciones de Netlify
5. Actualiza las URLs en:
   - `astro.config.mjs` → línea 7 (`site:`)
   - `public/robots.txt` → línea 6
   - Schema Markup en `src/pages/index.astro`

---

## 📊 Estructura del Proyecto

```
retirada-amianto/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.astro    # Navegación
│   │   ├── Hero.astro      # Hero + Formulario
│   │   ├── WhyUs.astro     # Por qué elegirnos
│   │   ├── Services.astro  # Servicios
│   │   ├── HowItWorks.astro
│   │   ├── Zones.astro     # Zonas de cobertura
│   │   ├── FAQ.astro       # Preguntas frecuentes
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro    # Layout con SEO
│   ├── pages/
│   │   ├── index.astro     # Homepage
│   │   └── api/
│   │       └── contact.ts  # API formulario (modo demo)
│   └── styles/
│       └── global.css
├── public/
│   ├── robots.txt
│   └── favicon.svg
└── README.md
```

---

## 📱 Secciones de la Landing Page

### 1. **Hero con Formulario**
- Título optimizado H1: "Retirada De Amianto"
- Formulario de contacto integrado
- 4 beneficios clave con iconos

### 2. **Por Qué Elegirnos**
- 6 razones con iconos profesionales
- Certificaciones y seguros

### 3. **Servicios**
- 6 tipos de servicios detallados
- Ilustraciones SVG personalizadas
- Lista de beneficios por servicio

### 4. **Cómo Funciona**
- Proceso en 3 pasos visuales
- Banner de seguridad con normativa

### 5. **Zonas de Cobertura**
- 12 ciudades principales
- Mensaje de consulta para otras zonas

### 6. **FAQ**
- 8 preguntas frecuentes
- Acordeón interactivo

### 7. **Footer**
- Información de contacto
- Enlaces legales
- Iconos y badges

---

## 📈 SEO Incluido

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
- HTML estático (SSG)
- CSS minificado
- Core Web Vitals optimizados

✅ **Sitemap:**
- Generado automáticamente
- Disponible en `/sitemap-index.xml`

✅ **Keywords incluidas:**
- retirada de amianto
- retirada de uralita
- desamiantado
- +20 keywords más

---

## 🔧 Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Crear build de producción
npm run build

# Preview del build
npm run preview

# Desplegar a Netlify
netlify deploy --prod
```

---

## 📊 Modo Demo del Formulario

El formulario actualmente funciona en **MODO DEMO**:

✅ **Qué hace:**
- Valida todos los campos
- Muestra feedback visual (loading, éxito, error)
- Registra los datos en la consola del servidor

❌ **Qué NO hace (todavía):**
- No envía emails reales
- No guarda en base de datos
- Es solo un prototipo visual

### Ver los datos enviados:

**En desarrollo local:**
- Mira la terminal donde ejecutaste `npm run dev`
- Verás los datos impresos en consola

**En Netlify:**
- Ve a tu proyecto en Netlify Dashboard
- Click en **"Functions"** → **"Logs"**
- Verás los datos enviados por el formulario

---

## 🎯 Próximos Pasos (Futuras Mejoras)

Una vez aprobado el diseño, se pueden añadir:

1. ✅ **Integración de Email** - Envío real de leads por email
2. ✅ **Base de datos** - Google Sheets o Airtable
3. ✅ **Google Analytics** - Métricas de visitas
4. ✅ **Páginas de ciudades** - SEO local
5. ✅ **Blog** - Contenido SEO
6. ✅ **reCAPTCHA** - Protección anti-spam

---

## 🌐 URLs Importantes

- **Sitemap:** `/sitemap-index.xml`
- **Robots:** `/robots.txt`
- **API Demo:** `/api/contact`

---

## 💡 Monitorización

### Google Search Console (Recomendado)

1. Ve a https://search.google.com/search-console/
2. Añade tu dominio
3. Verifica la propiedad
4. Envía el sitemap: `https://tudominio.com/sitemap-index.xml`

### Google Analytics (Opcional)

Añade este código en `src/layouts/Layout.astro` antes de `</head>`:

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

---

## 📞 Datos de Contacto en la Web

Recuerda actualizar en `src/components/Footer.astro`:
- Teléfono: Línea 66
- Email: Línea 72
- Horario: Línea 78

---

## ✅ Checklist de Despliegue

- [ ] Instalar Node.js
- [ ] Clonar repositorio / descargar código
- [ ] Ejecutar `npm install`
- [ ] Probar en local con `npm run dev`
- [ ] Personalizar colores y textos
- [ ] Desplegar en Vercel
- [ ] Configurar dominio personalizado (opcional)
- [ ] Añadir a Google Search Console
- [ ] Configurar Google Analytics (opcional)

---

## 🐛 Solución de Problemas

### Error al ejecutar `npm run dev`

```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### La web no se ve bien en móvil

- Asegúrate de estar usando la última versión del código
- Limpia la caché del navegador (Ctrl + Shift + R)

### El formulario no muestra el mensaje de éxito

- Abre la consola del navegador (F12)
- Mira si hay errores en la pestaña "Console"
- Verifica que `/api/contact` esté funcionando

---

## 📄 Licencia

Este proyecto es privado y está creado específicamente para tu negocio de retirada de amianto.

---

**¡Tu landing page está lista para despegar! 🚀**

Sin complicaciones. Sin configuración de APIs. Solo despliega y funciona.

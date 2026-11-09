# Liberar sin esperar

Propuesta al **Censo de Oportunidades de Mejora Continua** para eliminar el cuello de botella en las liberaciones de Calidad: primera pieza, materia prima y certificados.

- **Propuesta:** Vanessa Serna
- **Diseño y desarrollo del sitio:** Estiven Serna

El sitio reúne la propuesta (problema, solución, propuesta "más allá" y método) y seis herramientas para ponerla en marcha: simulador de escenarios, plan de acción, línea base, sistema de ideas, matriz de liberación por riesgo y plantillas. Incluye un recorrido guiado (`CamelAssistant`) que explica cada sección.

## Estructura

```
.
├── index.html       Sitio completo: HTML, CSS y JavaScript en un solo archivo
├── favicon.svg      Ícono de la pestaña
├── og-image.png     Imagen de vista previa al compartir el enlace
├── vercel.json      Configuración de Vercel
├── apps-script.gs   Opcional: datos compartidos en Google Sheets
├── .gitignore
└── README.md
```

No necesita instalación, compilación ni dependencias. Para verlo en el computador, abra `index.html` con doble clic.

## Publicar en Vercel

### 1. Subir a GitHub

1. Entre a [github.com/new](https://github.com/new) e inicie sesión.
2. **Repository name:** `liberar-sin-esperar`. Elija **Public** o **Private**; Vercel funciona con los dos. No marque "Add a README".
3. Pulse **Create repository**.
4. En la página siguiente, pulse **uploading an existing file**.
5. Arrastre **todos** los archivos de esta carpeta. El archivo `.gitignore` puede quedar oculto en Windows; si no aparece, no pasa nada.
6. Pulse **Commit changes**.

Si usa la terminal (requiere Git instalado):

```bash
git init
git add .
git commit -m "Primera versión del sitio"
git branch -M main
git remote add origin https://github.com/SU-USUARIO/liberar-sin-esperar.git
git push -u origin main
```

### 2. Conectar con Vercel

1. Entre a [vercel.com/signup](https://vercel.com/signup) y elija **Continue with GitHub**. El plan **Hobby** es gratis.
2. Pulse **Add New… → Project** y, junto al repositorio `liberar-sin-esperar`, pulse **Import**.
3. Deje todo como aparece: **Framework Preset: Other**, sin comando de compilación. Pulse **Deploy**.
4. En menos de un minuto tendrá una dirección como `https://liberar-sin-esperar.vercel.app`.

### 3. Personalizar la dirección

En el proyecto de Vercel: **Settings → Domains**. Edite el dominio `.vercel.app` y escriba otro nombre libre, por ejemplo `liberar-sin-esperar-camel.vercel.app`.

### 4. Vista previa al compartir en WhatsApp o Teams

Algunas aplicaciones solo muestran la imagen de vista previa si la dirección es completa. Cuando tenga la URL final, en `index.html` cambie:

```html
<meta property="og:image" content="og-image.png">
```

por:

```html
<meta property="og:image" content="https://SU-DIRECCION.vercel.app/og-image.png">
```

### Actualizar el sitio

Cada cambio que suba a GitHub (**Add file → Upload files**, o `git push`) se publica solo en Vercel en unos segundos.

## Datos compartidos (opcional)

Sin configurar nada, las ideas, los registros de línea base, las referencias y el avance del plan se guardan **solo en el navegador de cada persona**. Para que todo el equipo vea lo mismo:

1. Cree una hoja en [sheets.google.com](https://sheets.google.com).
2. **Extensiones → Apps Script.** Pegue el contenido de `apps-script.gs` y guarde.
3. **Implementar → Nueva implementación → Aplicación web.** En "Ejecutar como" elija **Yo** y en "Quién tiene acceso", **Cualquier usuario**.
4. Copie la URL que termina en `/exec` y péguela en `index.html`, en `backendUrl: ""`.
5. Suba de nuevo `index.html` a GitHub.

En la barra superior aparecerá **Datos compartidos**. Cualquier persona que tenga la URL de la aplicación web puede escribir en la hoja, así que no la comparta fuera de la empresa.

## Configuración

Al inicio de `index.html`:

```js
window.CAMEL_CONFIG = {
  backendUrl: "",            // URL de Apps Script, opcional
  autor: "Vanessa Serna",    // autora de la propuesta
  sitio: "Estiven Serna"     // autor del sitio
};
```

Los textos del recorrido guiado están en la lista `STEPS`, dentro de `CamelAssistant`.

## Nota

Esta es una propuesta independiente y no un documento oficial de la empresa. Los valores del simulador son supuestos editables, y las fuentes están citadas con autor y año en la sección **Documentación** del sitio.

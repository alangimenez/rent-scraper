# Plan de Integración Frontend — Rent Scraper Fullstack

## 1. Investigación: Render.com y proyectos fullstack con Node.js

### ¿Es posible servir un proyecto fullstack desde un único servicio en Render?

**Sí, es completamente posible y es la arquitectura recomendada para este caso.**

Un **Web Service** de Render que corre Node.js puede servir simultáneamente:
- Rutas de API (`/property`, `/scraper`, etc.)
- Archivos estáticos del frontend (HTML, CSS, JS) mediante `express.static()`

Todo el tráfico (tanto peticiones a la API como carga de archivos del frontend) pasa por el proceso Node.js. Render termina SSL y reenvía las peticiones al puerto que defina la variable de entorno `PORT`.

### Configuración básica en Express

```js
const path = require('path');

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API (deben ir antes del catch-all)
app.use('/scraper', ScraperController);
app.use('/property', PropertyController);
app.use('/registerProcess', RegisterProcessController);

// Catch-all: devuelve el frontend para cualquier otra ruta
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

### Limitaciones relevantes del tier gratuito de Render

| Aspecto | Detalle |
|---|---|
| **Filesystem efímero** | Los archivos escritos en runtime se pierden al reiniciar. No afecta a este proyecto. |
| **Sin CDN** | Los archivos estáticos pasan por Node.js. Aceptable para un dashboard personal. |
| **750 instance-hours/mes** | Compartidas entre todos los servicios gratuitos del workspace. |
| **Bandwidth** | 5 GB/mes de salida gratuitos. |

### Comportamiento de "sleep" (el más importante para la UX)

- **Trigger:** El servicio se suspende tras **15 minutos sin tráfico HTTP**.
- **Cold start:** La siguiente petición tarda **~60 segundos** en responder (Render muestra su propia pantalla de carga).
- **Impacto:** Los usuarios verán una pantalla de Render durante ~1 minuto si el servicio estaba dormido.
- **Workaround recomendado:** Usar un servicio externo como [cron-job.org](https://cron-job.org) para hacer ping al servidor cada 14 minutos y mantenerlo activo.

> **Nota:** El cold start de Render ocurre **antes** de que llegue la petición a Express, por lo que el frontend no puede manejar ese primer timeout. Sin embargo, **sí puede manejar** los timeouts de las peticiones de API cuando el servidor se despertó pero aún está inicializando MongoDB u otras conexiones.

---

## 2. Arquitectura del proyecto fullstack

```
rent-scraper/                    ← Repositorio actual (backend)
├── public/                      ← NUEVO: Frontend estático
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── app.js               ← Punto de entrada JS
│       ├── api.js               ← Capa de comunicación con el backend
│       ├── filters.js           ← Lógica de filtros
│       └── ui.js                ← Renderizado de componentes
├── controller/
├── models/
├── useCases/
├── ... (estructura existente)
└── index.js
```

**Decisión de tecnología frontend:** Vanilla HTML + CSS + JavaScript (sin frameworks). Justificación:
- El proyecto es un dashboard personal de lectura.
- No requiere enrutamiento complejo ni gestión de estado avanzada.
- Evita complejidad de build tooling (webpack, vite, etc.) y de despliegue.
- Los archivos pueden ir directamente en `/public` y ser servidos por Express.

---

## 3. Plan de trabajo: Frontend

### 3.1 Estructura de la interfaz

El frontend consistirá en una **única página** con:

1. **Header:** Título de la app + indicador de estado del servidor
2. **Panel de filtros:** Controles para refinar la búsqueda
3. **Barra de resultados:** Total de anuncios encontrados + selector de cantidad por página
4. **Grid de propiedades:** Tarjetas con los anuncios encontrados
5. **Paginación:** Navegación entre páginas de resultados

### 3.2 Filtros a implementar

| Filtro | Campo en DB | Tipo de control | Valores posibles |
|---|---|---|---|
| Tipo de fuente | `source` | Select / Radio | RealState, Portal |
| Inmobiliaria | `realState` | Select | Valores únicos de DB |
| Operación | `operation` | Select | Sale (Venta), Rent (Alquiler) |
| Fecha desde | `createdDate` | Date picker | — |
| Fecha hasta | `createdDate` | Date picker | — |
| Ciudad / Zona | `city` | Select | Valores únicos de DB |
| Moneda | `currency` | Select | USD, ARS |
| Precio mínimo | `price` | Input numérico | — |
| Precio máximo | `price` | Input numérico | — |

**Notas de comportamiento de los filtros:**
- El filtro de **inmobiliaria** se habilita/deshabilita según el tipo de fuente (`source = RealState`). Si se selecciona Portal, el filtro de inmobiliaria queda deshabilitado y vacío.
- El filtro de **precio mínimo/máximo** solo aplica con sentido cuando se selecciona una moneda. Si hay precio sin moneda, mostrar advertencia: *"Seleccioná una moneda para filtrar por precio"*.
- Los selectores de **ciudad** e **inmobiliaria** se pueblan dinámicamente desde el endpoint `GET /property/filterOptions`, mostrando solo valores existentes en la base de datos.
- El filtro de **fecha** permite seleccionar un rango desde/hasta. Si se selecciona solo una fecha, actúa como fecha puntual (el mismo valor en `dateFrom` y `dateTo`, ajustando `dateTo` al final del día: `23:59:59`).
- Todos los filtros son **opcionales**. Sin filtros activos, se devuelve la primera página de todos los resultados ordenados por fecha descendente.

### 3.3 Paginación

El frontend debe permitir al usuario elegir cuántos resultados ver por página y navegar entre páginas.

**Selector de cantidad por página:** 15 / 30 / 50 resultados (valor por defecto: 15)

**Controles de navegación:**
- Botón "Anterior" (deshabilitado en página 1)
- Indicador: `Página X de Y`
- Botón "Siguiente" (deshabilitado en última página)
- Total de resultados: `N anuncios encontrados`

**Comportamiento:** Al cambiar cualquier filtro, la paginación vuelve a la página 1. Al cambiar el tamaño de página, también vuelve a la página 1.

### 3.4 Datos a mostrar en cada tarjeta de propiedad

- Imagen (`pictureSrc`) — con imagen de placeholder si no hay foto
- Título (`title`)
- Precio (`price` + `currency`)
- Ciudad (`city`)
- Fuente (`source`) + Inmobiliaria (`realState`)
- Operación (`operation`): mostrar como "Venta" / "Alquiler"
- Fecha de guardado (`createdDate`): formateada como `DD/MM/YYYY`
- Botón "Ver anuncio" (`url`) → abre en pestaña nueva

### 3.5 Manejo del servidor dormido (Render cold start)

El servidor en Render puede tardar ~60 segundos en responder cuando está dormido. La estrategia:

**Fase 1 — Pantalla de Render (no controlable):**
Render muestra su propia página de "waking up" antes de que llegue tráfico a Express. No podemos interceptar esto desde el frontend.

**Fase 2 — Timeout de peticiones de API (controlable):**
Una vez que Express responde, puede haber demoras adicionales mientras se establece la conexión con MongoDB. El frontend debe:

```
1. Mostrar spinner de carga desde el primer momento
2. Configurar un timeout de ~30 segundos por petición
3. Si la petición falla o supera el timeout:
   a. Mostrar mensaje: "El servidor está iniciando, esto puede tardar hasta 1 minuto..."
   b. Botón "Reintentar" manual
   c. Reintento automático con countdown visible (ej: "Reintentando en 15s...")
4. Máximo 3 reintentos automáticos antes de mostrar error definitivo
```

**Implementación sugerida en `api.js`:**
```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  const TIMEOUT_MS = 30000;
  const RETRY_DELAY_MS = 15000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeout);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      clearTimeout(timeout);
      if (attempt === maxRetries) throw err;

      updateStatusMessage(`Servidor iniciando... reintentando (${attempt}/${maxRetries - 1})`);
      await sleep(RETRY_DELAY_MS);
    }
  }
}
```

### 3.6 Estados de la UI

| Estado | Descripción | Componente |
|---|---|---|
| `idle` | Sin búsqueda realizada | Pantalla de bienvenida / instrucciones |
| `loading` | Petición en curso | Spinner + mensaje de carga |
| `retrying` | Reintentando (servidor dormido) | Spinner + mensaje + countdown |
| `success` | Datos cargados | Grid de propiedades + paginación |
| `empty` | Sin resultados para los filtros | Mensaje "Sin resultados" |
| `error` | Error definitivo | Mensaje de error + botón reintentar |

### 3.7 Archivos del frontend y responsabilidades

**`public/index.html`**
- Estructura HTML de la página
- Formulario de filtros
- Barra de resultados con selector de página y total
- Contenedor del grid de propiedades
- Controles de paginación (anterior / página X de Y / siguiente)
- Templates para tarjetas (usando `<template>` tag)

**`public/css/styles.css`**
- Layout responsive (CSS Grid / Flexbox)
- Estilos de tarjetas de propiedad
- Estilos de filtros y controles
- Estilos de paginación
- Indicadores de estado (spinner, badges de fuente/operación)

**`public/js/api.js`**
- Función `fetchWithRetry` con manejo de timeout y reintentos
- Función `getProperties(filters, page, pageSize)` → llama a `GET /property/search`
- Función `getFilterOptions()` → llama a `GET /property/filterOptions`
- Construcción de query strings a partir de filtros y parámetros de paginación

**`public/js/filters.js`**
- Lectura de los valores del formulario de filtros
- Validaciones: precio mínimo < precio máximo; moneda requerida si hay precio
- Conversión a parámetros de la API
- Lógica de habilitar/deshabilitar el selector de inmobiliaria según fuente

**`public/js/ui.js`**
- Renderizado de tarjetas de propiedad
- Renderizado de controles de paginación
- Actualización del total de resultados y estado de página
- Manejo del spinner y overlays de estado
- Formateo: fechas (`DD/MM/YYYY`), precios con separadores de miles

**`public/js/app.js`**
- Inicialización de la app: carga `filterOptions` al arrancar
- Event listeners del formulario de filtros y paginación
- Estado de paginación actual (`currentPage`, `currentPageSize`)
- Orquestación entre `api.js`, `filters.js` y `ui.js`

---

## 4. Plan de trabajo: Modificaciones al Backend

### 4.1 Nuevo endpoint de búsqueda con filtros combinados y paginación

Los endpoints actuales serán **eliminados** una vez que el nuevo endpoint esté en funcionamiento:

| Endpoint a eliminar | Motivo |
|---|---|
| `GET /property?createdDate=` | Reemplazado por `/property/search` |
| `GET /property/filteredByPricePropertyType` | Reemplazado por `/property/search` |

**Nuevo endpoint:**

```
GET /property/search
```

**Query params (todos opcionales):**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `source` | String | `RealState` o `Portal` |
| `realState` | String | Nombre de la inmobiliaria |
| `operation` | String | `Sale` o `Rent` |
| `dateFrom` | String (ISO) | Fecha de guardado desde (ej: `2025-01-01`) |
| `dateTo` | String (ISO) | Fecha de guardado hasta (ej: `2025-01-31T23:59:59`) |
| `city` | String | Ciudad / zona |
| `currency` | String | `USD` o `ARS` |
| `minPrice` | Number | Precio mínimo |
| `maxPrice` | Number | Precio máximo |
| `page` | Number | Número de página (default: `1`) |
| `pageSize` | Number | Resultados por página: `15`, `30` o `50` (default: `15`) |

**Formato de respuesta:**

```json
{
  "data": [ /* array de propiedades */ ],
  "pagination": {
    "total": 150,
    "page": 1,
    "pageSize": 15,
    "totalPages": 10
  }
}
```

**Pasos de implementación:**

1. **`repositories/mongoDb/PropertiesMongo.js`** — Agregar método `searchByFilters(filters, page, pageSize)`.

2. **`useCases/retrieveProperties/RetrieveProperties.js`** — Agregar método `searchProperties(filters, page, pageSize)`.

3. **`controller/PropertyController.js`** — Agregar ruta `GET /search`; eliminar rutas `GET /` y `GET /filteredByPricePropertyType`.

**Implementación sugerida del query dinámico en MongoDB:**

```javascript
async searchByFilters(filters, page = 1, pageSize = 15) {
  const query = {};

  if (filters.source)    query.source = filters.source;
  if (filters.realState) query.realState = filters.realState;
  if (filters.currency)  query.currency = filters.currency;
  if (filters.operation) query.operation = filters.operation;
  if (filters.city)      query.city = { $regex: filters.city, $options: 'i' };

  if (filters.dateFrom || filters.dateTo) {
    query.createdDate = {};
    if (filters.dateFrom) query.createdDate.$gte = new Date(filters.dateFrom);
    if (filters.dateTo)   query.createdDate.$lte = new Date(filters.dateTo);
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
    if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
  }

  const skip = (page - 1) * pageSize;

  const [data, total] = await Promise.all([
    this.model.find(query).sort({ createdDate: -1 }).skip(skip).limit(pageSize),
    this.model.countDocuments(query)
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    }
  };
}
```

### 4.2 Endpoint para obtener valores de filtros

Para poblar los dropdowns del frontend con valores reales de la base de datos:

```
GET /property/filterOptions
```

**Respuesta:**
```json
{
  "cities": ["Junín", "..."],
  "realStates": ["Remax", "ICarlucci", "..."],
  "sources": ["RealState", "Portal"],
  "currencies": ["USD", "ARS"],
  "operations": ["Sale", "Rent"]
}
```

**Implementación sugerida en MongoDB:**
```javascript
async getFilterOptions() {
  const [cities, realStates, sources, currencies, operations] = await Promise.all([
    this.model.distinct('city'),
    this.model.distinct('realState'),
    this.model.distinct('source'),
    this.model.distinct('currency'),
    this.model.distinct('operation')
  ]);
  return {
    cities: cities.filter(Boolean).sort(),
    realStates: realStates.filter(Boolean).sort(),
    sources: sources.filter(Boolean),
    currencies: currencies.filter(Boolean),
    operations: operations.filter(Boolean)
  };
}
```

> El `.filter(Boolean)` elimina valores `null` o vacíos que puedan existir en la base de datos.

### 4.3 Servir el frontend desde Express

**Modificaciones en `index.js`:**

```javascript
const path = require('path');

// Agregar ANTES de las rutas de API:
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de API (sin cambios en el orden)
app.use('/scraper', ScraperController);
app.use('/property', PropertyController);
app.use('/registerProcess', RegisterProcessController);

// Agregar AL FINAL, después de todas las rutas de API:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

### 4.4 Revisión de CORS

Actualmente el backend tiene CORS configurado con `app.use(cors())` (permite todos los orígenes). Al servir el frontend desde el mismo servidor en producción, las peticiones serán same-origin y CORS no aplicará.

Durante el desarrollo local, si se abre `index.html` directamente en el browser (protocolo `file://`) o con Live Server en otro puerto, CORS sí aplica. La configuración actual con `cors()` abierto es suficiente para desarrollo. No se requieren cambios.

### 4.5 Script de inicio para producción en Render

Render detecta automáticamente el script `start` en `package.json`. Agregar:

```json
"scripts": {
  "start": "NODE_ENV=prod LOG_LEVEL=1 node index.js",
  ...scripts existentes sin cambios...
}
```

> **Importante:** Render inyecta automáticamente la variable `$PORT`. El código ya la lee vía `Configs.js`, por lo que no se requieren cambios adicionales.

---

## 5. Pasos de implementación (orden sugerido)

### Fase 1: Backend — Nuevo endpoint de búsqueda
- [ ] Agregar método `searchByFilters(filters, page, pageSize)` en `PropertiesMongo.js`
- [ ] Agregar método `getFilterOptions()` en `PropertiesMongo.js`
- [ ] Agregar método `searchProperties(filters, page, pageSize)` en `RetrieveProperties.js`
- [ ] Agregar método `getFilterOptions()` en `RetrieveProperties.js`
- [ ] Agregar ruta `GET /search` en `PropertyController.js`
- [ ] Agregar ruta `GET /filterOptions` en `PropertyController.js`
- [ ] Eliminar rutas `GET /` y `GET /filteredByPricePropertyType` de `PropertyController.js`
- [ ] Eliminar métodos correspondientes en `RetrieveProperties.js` y `PropertiesMongo.js`
- [ ] Probar nuevos endpoints con curl o Postman

### Fase 2: Backend — Servir archivos estáticos y scripts
- [ ] Crear directorio `public/` con un `index.html` de prueba
- [ ] Agregar `require('path')` y `express.static()` en `index.js`
- [ ] Agregar catch-all route al final de `index.js`
- [ ] Agregar script `start` en `package.json`
- [ ] Verificar que el frontend de prueba se sirve correctamente en local

### Fase 3: Frontend — Estructura base
- [ ] Crear `public/index.html` con layout completo (header, filtros, grid, paginación)
- [ ] Crear `public/css/styles.css` con estilos responsive

### Fase 4: Frontend — Capa de API
- [ ] Crear `public/js/api.js` con `fetchWithRetry`
- [ ] Implementar función `getProperties(filters, page, pageSize)`
- [ ] Implementar función `getFilterOptions()`

### Fase 5: Frontend — Filtros, UI y paginación
- [ ] Crear `public/js/filters.js` con lectura, validación y conversión de filtros
- [ ] Implementar lógica de habilitar/deshabilitar selector de inmobiliaria según fuente
- [ ] Implementar validación de moneda requerida al filtrar por precio
- [ ] Crear `public/js/ui.js` con renderizado de tarjetas y controles de paginación
- [ ] Implementar todos los estados de la UI (idle, loading, retrying, success, empty, error)
- [ ] Crear `public/js/app.js` con inicialización, event listeners y estado de paginación

### Fase 6: Integración y testing
- [ ] Prueba completa del flujo: aplicar filtros → ver resultados → navegar entre páginas
- [ ] Verificar que el cambio de filtros resetea a página 1
- [ ] Verificar que el cambio de pageSize resetea a página 1
- [ ] Simular timeout y verificar comportamiento de reintento automático
- [ ] Verificar responsive en mobile
- [ ] Deploy a Render y verificar funcionamiento en producción

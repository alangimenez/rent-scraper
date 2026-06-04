/**
 * ui.js — Renderizado de componentes y gestión de estados de la UI
 */

const STATES = ['idle', 'loading', 'retrying', 'success', 'empty', 'error'];

/**
 * Cambia el estado visual de la sección de resultados.
 * @param {'idle'|'loading'|'retrying'|'success'|'empty'|'error'} state
 */
function setState(state) {
    STATES.forEach(s => {
        const el = document.getElementById(`state-${s}`);
        if (el) el.classList.toggle('hidden', s !== state);
    });
}

/**
 * Actualiza el indicador de estado del servidor en el header.
 * @param {'loading'|'online'|'offline'} status
 * @param {string} text
 */
function setServerStatus(status, text) {
    const dot  = document.getElementById('status-dot');
    const label = document.getElementById('status-text');
    dot.className = `status-dot ${status}`;
    label.textContent = text;
}

/**
 * Muestra el mensaje de reintento con countdown.
 * @param {number} attempt - Intento actual (1, 2…)
 * @param {number} totalRetries - Total de reintentos posibles
 * @param {number} secondsTotal - Segundos hasta el próximo intento
 */
function showRetryCountdown(attempt, totalRetries, secondsTotal) {
    setState('retrying');
    setServerStatus('loading', 'Iniciando...');

    const infoEl = document.getElementById('retry-info');
    let remaining = secondsTotal;

    function updateLabel() {
        infoEl.textContent = `Reintentando en ${remaining}s... (intento ${attempt} de ${totalRetries})`;
    }

    updateLabel();

    const interval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            clearInterval(interval);
            infoEl.textContent = `Conectando (intento ${attempt} de ${totalRetries})...`;
        } else {
            updateLabel();
        }
    }, 1000);

    // Guardar para poder cancelarlo si es necesario
    window._retryInterval = interval;
}

function clearRetryCountdown() {
    if (window._retryInterval) {
        clearInterval(window._retryInterval);
        window._retryInterval = null;
    }
}

/**
 * Muestra un error definitivo con mensaje.
 * @param {string} message
 */
function showError(message) {
    clearRetryCountdown();
    setState('error');
    setServerStatus('offline', 'Sin conexión');
    document.getElementById('error-message').textContent = message;
}

/**
 * Actualiza la barra de resultados (contador y paginación).
 * @param {Object} pagination - { total, page, pageSize, totalPages }
 */
function updateResultsBar(pagination) {
    const { total, page, pageSize, totalPages } = pagination;

    const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const to   = Math.min(page * pageSize, total);

    document.getElementById('results-count').innerHTML =
        `Mostrando <strong>${from}–${to}</strong> de <strong>${total}</strong> anuncio${total !== 1 ? 's' : ''}`;

    document.getElementById('page-info').textContent = `Página ${page} de ${totalPages}`;

    document.getElementById('prev-btn').disabled = page <= 1;
    document.getElementById('next-btn').disabled = page >= totalPages;
}

/**
 * Renderiza el grid de tarjetas de propiedades.
 * @param {Array} properties
 */
function renderPropertyGrid(properties) {
    const grid     = document.getElementById('property-grid');
    const template = document.getElementById('property-card-template');

    grid.innerHTML = '';

    properties.forEach(property => {
        const clone = template.content.cloneNode(true);
        const card  = clone.querySelector('.property-card');

        // Imagen
        const img         = card.querySelector('.card-image');
        const placeholder = card.querySelector('.card-image-placeholder');

        if (property.pictureSrc) {
            img.src = property.pictureSrc;
            img.alt = property.title || 'Propiedad';
            placeholder.classList.add('hidden');
            img.addEventListener('error', () => {
                img.classList.add('has-error');
                placeholder.classList.remove('hidden');
            });
        } else {
            img.classList.add('has-error');
        }

        // Badges
        const opBadge  = card.querySelector('.badge-operation');
        const srcBadge = card.querySelector('.badge-source');

        opBadge.textContent = formatOperation(property.operation);
        opBadge.classList.add(property.operation === 'Sale' ? 'sale' : 'rent');

        srcBadge.textContent = formatSource(property.source);
        srcBadge.classList.add(property.source === 'RealState' ? 'realstate' : 'portal');

        // Precio
        card.querySelector('.card-price').textContent = formatPrice(property.price, property.currency);

        // Título
        card.querySelector('.card-title').textContent = property.title || 'Sin título';

        // Detalles
        card.querySelector('.card-city').textContent      = property.city || 'Ciudad no especificada';
        card.querySelector('.card-realstate').textContent = formatRealState(property.realState, property.source);
        card.querySelector('.card-date').textContent      = formatDate(property.createdDate);

        // Link
        const link = card.querySelector('.btn-link');
        if (property.url) {
            link.href = property.url;
        } else {
            link.style.display = 'none';
        }

        grid.appendChild(clone);
    });
}

// ---- Helpers de formato ----

function formatPrice(price, currency) {
    if (price == null || price === 0) return 'Precio no disponible';
    const formatted = price.toLocaleString('es-AR');
    return currency ? `${currency} ${formatted}` : formatted;
}

function formatDate(dateStr) {
    if (!dateStr) return 'Fecha desconocida';
    const d = new Date(dateStr);
    const day   = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year  = d.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatOperation(operation) {
    if (operation === 'Sale') return 'Venta';
    if (operation === 'Rent') return 'Alquiler';
    return operation || '';
}

function formatSource(source) {
    if (source === 'RealState') return 'Inmobiliaria';
    if (source === 'Portal')    return 'Portal';
    return source || '';
}

function formatRealState(realState, source) {
    if (!realState) return 'Fuente desconocida';
    return `${realState} (${formatSource(source)})`;
}

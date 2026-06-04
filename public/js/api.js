/**
 * api.js — Capa de comunicación con el backend
 * Maneja timeouts y reintentos para cuando el servidor de Render está dormido.
 */

const TIMEOUT_MS = 30000;
const RETRY_DELAY_MS = 15000;
const MAX_RETRIES = 3;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Realiza un fetch con reintentos automáticos.
 * @param {string} url - URL relativa del endpoint
 * @param {Function|null} onRetrying - Callback(attempt, totalRetries, delaySeconds) llamado antes de cada reintento
 * @returns {Promise<any>} - JSON de la respuesta
 */
async function fetchWithRetry(url, onRetrying = null) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeout);

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            }

            return await response.json();

        } catch (err) {
            clearTimeout(timeout);

            if (attempt === MAX_RETRIES) {
                throw new Error(
                    err.name === 'AbortError'
                        ? 'El servidor no respondió a tiempo. Verificá tu conexión o intentá más tarde.'
                        : err.message
                );
            }

            if (onRetrying) {
                onRetrying(attempt, MAX_RETRIES - 1, RETRY_DELAY_MS / 1000);
            }

            await sleep(RETRY_DELAY_MS);
        }
    }
}

/**
 * Obtiene las opciones disponibles para los filtros (ciudades, inmobiliarias, etc.)
 * @param {Function|null} onRetrying
 */
function getFilterOptions(onRetrying = null) {
    return fetchWithRetry('/property/filterOptions', onRetrying);
}

/**
 * Busca propiedades con filtros y paginación.
 * @param {Object} filters - Filtros activos
 * @param {number} page - Número de página (desde 1)
 * @param {number} pageSize - Resultados por página (15, 30 o 50)
 * @param {Function|null} onRetrying
 */
function getProperties(filters, page, pageSize, onRetrying = null) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, val]) => {
        if (val !== null && val !== undefined && val !== '') {
            params.append(key, val);
        }
    });

    params.append('page', page);
    params.append('pageSize', pageSize);

    return fetchWithRetry(`/property/search?${params.toString()}`, onRetrying);
}

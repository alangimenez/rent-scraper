/**
 * app.js — Inicialización y orquestación de la aplicación
 */

// ---- Estado de la aplicación ----
const appState = {
    currentPage: 1,
    currentPageSize: 15,
    lastFilters: {}
};

// ---- Inicialización ----
document.addEventListener('DOMContentLoaded', async () => {
    initFilterBehavior();
    initEventListeners();
    setState('idle');
    await loadFilterOptions();
});

async function loadFilterOptions() {
    setServerStatus('loading', 'Conectando...');
    try {
        const options = await getFilterOptions((attempt, total, delay) => {
            showRetryCountdown(attempt, total, delay);
        });
        clearRetryCountdown();
        populateFilterOptions(options);
        setServerStatus('online', 'Conectado');
    } catch (err) {
        // Si falla la carga de opciones, no es fatal — mostramos estado idle igual
        // pero marcamos el servidor como offline
        setServerStatus('offline', 'Sin conexión');
        console.warn('No se pudieron cargar las opciones de filtros:', err.message);
    }
}

// ---- Event listeners ----
function initEventListeners() {
    // Formulario de búsqueda
    document.getElementById('filters-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const validation = validateFilters();
        if (!validation.valid) {
            alert(validation.message);
            return;
        }
        appState.currentPage = 1;
        search();
    });

    // Botón limpiar
    document.getElementById('clear-btn').addEventListener('click', () => {
        clearFilters();
        setState('idle');
    });

    // Toggle de filtros (mobile)
    document.getElementById('filters-toggle').addEventListener('click', () => {
        const form = document.getElementById('filters-form');
        const btn = document.getElementById('filters-toggle');
        const isOpen = !form.classList.contains('collapsed');
        form.classList.toggle('collapsed', isOpen);
        btn.querySelector('span').textContent = isOpen ? 'Mostrar' : 'Ocultar';
        btn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Selector de orden
    document.getElementById('sort-by').addEventListener('change', () => {
        appState.currentPage = 1;
        search();
    });

    // Selector de cantidad por página
    document.getElementById('page-size').addEventListener('change', (e) => {
        appState.currentPageSize = parseInt(e.target.value);
        appState.currentPage = 1;
        search();
    });

    // Paginación
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (appState.currentPage > 1) {
            appState.currentPage--;
            search();
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentPage++;
        search();
    });

    // Botón reintentar en estado de error
    document.getElementById('retry-btn').addEventListener('click', () => {
        search();
    });
}

// ---- Búsqueda principal ----
async function search() {
    const filters = readFilters();
    appState.lastFilters = filters;

    setState('loading');
    setServerStatus('loading', 'Buscando...');

    try {
        const result = await getProperties(
            filters,
            appState.currentPage,
            appState.currentPageSize,
            (attempt, total, delay) => {
                showRetryCountdown(attempt, total, delay);
            }
        );

        clearRetryCountdown();
        setServerStatus('online', 'Conectado');

        const { data, pagination } = result;

        if (!data || data.length === 0) {
            setState('empty');
            return;
        }

        renderPropertyGrid(data);
        updateResultsBar(pagination);

        // Sincronizar el selector de pageSize con el estado actual
        document.getElementById('page-size').value = String(appState.currentPageSize);

        setState('success');

        // Scroll al inicio de los resultados en mobile
        if (window.innerWidth <= 900) {
            document.querySelector('.results-section').scrollIntoView({ behavior: 'smooth' });
        }

    } catch (err) {
        showError(err.message || 'Ocurrió un error inesperado. Por favor, intentá de nuevo.');
    }
}

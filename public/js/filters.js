/**
 * filters.js — Lectura, validación y población de los filtros del formulario
 */

/**
 * Lee los valores actuales del formulario de filtros.
 * @returns {Object} filtros listos para enviar a la API
 */
function readFilters() {
    const filters = {};

    const source = document.getElementById('source').value;
    const realState = document.getElementById('realState').value;
    const operation = document.getElementById('operation').value;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const city = document.getElementById('city').value;
    const currency = document.getElementById('currency').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    if (source) filters.source = source;
    if (realState && source === 'RealState') filters.realState = realState;
    if (operation) filters.operation = operation;
    if (city) filters.city = city;
    if (currency) filters.currency = currency;

    // Se agrega el offset de Argentina (UTC-3) para que el filtro corresponda al día local
    if (dateFrom) filters.dateFrom = dateFrom + 'T00:00:00-03:00';
    if (dateTo) filters.dateTo = dateTo + 'T23:59:59.999-03:00';

    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;

    const sortBy = document.getElementById('sort-by').value;
    if (sortBy) filters.sortBy = sortBy;

    return filters;
}

/**
 * Valida los filtros del formulario.
 * @returns {{ valid: boolean, message: string|null }}
 */
function validateFilters() {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const currency = document.getElementById('currency').value;

    const hasPrice = minPrice !== '' || maxPrice !== '';

    if (hasPrice && !currency) {
        return { valid: false, message: 'Seleccioná una moneda para filtrar por precio' };
    }

    if (minPrice !== '' && maxPrice !== '' && Number(minPrice) > Number(maxPrice)) {
        return { valid: false, message: 'El precio mínimo no puede ser mayor al máximo' };
    }

    return { valid: true, message: null };
}

/**
 * Puebla los selectores de city y realState con los valores de la API.
 * @param {Object} options - Respuesta de /property/filterOptions
 */
function populateFilterOptions(options) {
    _populateSelect('city', options.cities || []);
    _populateSelect('realState', options.realStates || []);
}

function _populateSelect(id, values) {
    const select = document.getElementById(id);
    // Mantener el option vacío inicial
    const firstOption = select.options[0];
    select.innerHTML = '';
    select.appendChild(firstOption);

    values.forEach(val => {
        if (!val) return;
        const option = document.createElement('option');
        option.value = val;
        option.textContent = val;
        select.appendChild(option);
    });
}

/**
 * Configura el comportamiento reactivo del selector de fuente:
 * - Habilita/deshabilita el selector de inmobiliaria según el valor de source.
 * - Muestra/oculta la advertencia de precio sin moneda.
 */
function initFilterBehavior() {
    const sourceSelect = document.getElementById('source');
    const realStateSelect = document.getElementById('realState');
    const realstateHint = document.getElementById('realstate-hint');
    const priceWarning = document.getElementById('price-warning');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const currencySelect = document.getElementById('currency');

    function updateRealStateSelector() {
        const isRealState = sourceSelect.value === 'RealState';
        realStateSelect.disabled = !isRealState;
        if (!isRealState) {
            realStateSelect.value = '';
        }
        realstateHint.classList.toggle('hidden', isRealState);
    }

    function updatePriceWarning() {
        const hasPrice = minPriceInput.value !== '' || maxPriceInput.value !== '';
        const hasCurrency = currencySelect.value !== '';
        priceWarning.classList.toggle('hidden', !hasPrice || hasCurrency);
    }

    sourceSelect.addEventListener('change', updateRealStateSelector);
    minPriceInput.addEventListener('input', updatePriceWarning);
    maxPriceInput.addEventListener('input', updatePriceWarning);
    currencySelect.addEventListener('change', updatePriceWarning);

    // Estado inicial
    updateRealStateSelector();
    updatePriceWarning();
}

/**
 * Limpia todos los campos del formulario de filtros.
 */
function clearFilters() {
    document.getElementById('filters-form').reset();
    // Disparar change en source para actualizar estado del selector de inmobiliaria
    document.getElementById('source').dispatchEvent(new Event('change'));
    document.getElementById('price-warning').classList.add('hidden');
}

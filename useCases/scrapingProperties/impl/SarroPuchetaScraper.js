const puppeteer = require('puppeteer');

class SarroPuchetaScraper {
    constructor() { }

    async scrape(objective) {
        const browser = await puppeteer.launch();

        const iterations = await this.#getNumberOfPagesForScraping(browser, objective.url)
        let propertyList = []

        for (let i = 1; i < +iterations + 1; i++) {
            propertyList = [...propertyList, ...await this.#scrapeDynamicWebsite(i, browser, objective.url)]
        }

        await browser.close();

        propertyList.forEach(e => {
            e.city = objective.id
        })

        return propertyList
    }

    async #scrapeDynamicWebsite(pageId, browser, urlObjective) {
        const page = await browser.newPage();

        // Configurar User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        await page.goto(`${urlObjective}page=${pageId}`);

        // Evaluar el contenido de la página y extraer ambos datos
        const dataList = await page.evaluate(() => {
            // Seleccionar el div principal
            const container = document.querySelector('div.col-md-9');
            if (!container) return []; // Si no existe, devolver lista vacía

            // Seleccionar todos los divs de propiedades
            const cards = container.querySelectorAll('div.card.property-item.list');
            return Array.from(cards).map(card => {
                // Extraer información de cada card
                const dataId = card.getAttribute('data-id') || null;

                // Seleccionar el div con class "card-body" dentro del "card"
                const cardBody = card.querySelector('div.card-body');
                if (!cardBody) return null;

                // Seleccionar el div con class "row" dentro del "card-body"
                const row = cardBody.querySelector('div.row');
                if (!row) return null;

                // Seleccionar el div con class "col-12 col-md-4 image-container" dentro del "row"
                const imageContainer = row.querySelector('div.col-12.col-md-4.image-container');
                if (!imageContainer) return null;

                // Seleccionar la etiqueta <a> dentro del "image-container"
                const link = imageContainer.querySelector('a');
                if (!link) return null;

                // Seleccionar la etiqueta <img> dentro del <a> y obtener su atributo "src"
                const img = link.querySelector('img');
                const imgSrc = img ? img.getAttribute('src') : null;

                // Details container
                const detailsContainer = row.querySelector('div.col-12.col-md-8.details');
                if (!detailsContainer) return null;

                // Título del enlace
                const titleContainer = detailsContainer.querySelector('h5 a');
                if (!titleContainer) return null;
                const title = titleContainer.innerText.trim()

                // Dirección
                const address = detailsContainer.querySelector('p.address-to-show');
                const addressText = address ? address.innerText.trim() : null;

                // Precio
                const priceContainer = detailsContainer.querySelector('div.row');
                if (!priceContainer) return null;
                const priceContainerTwo = priceContainer.querySelector('div.col-12.col-md-6.price.d-none.d-md-block');
                if (!priceContainerTwo) return null;
                const price = priceContainerTwo.innerText.trim()

                // Href del enlace
                const href = titleContainer.getAttribute('href')
                const completeHref = `https://sarropucheta.com${href}`

                return {
                    id: dataId,
                    pictureSrc: imgSrc,
                    title: title,
                    address: addressText,
                    price: price,
                    url: completeHref
                };
            });
        });

        return dataList
    }

    async #getNumberOfPagesForScraping(browser, url) {
        const page = await browser.newPage();

        // Configurar User-Agent para evitar bloqueos
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        // Navegar a la página objetivo
        await page.goto(`${url}`, { waitUntil: 'domcontentloaded' });

        // Función para obtener el valor del anteúltimo <li>
        const getAnteultimoValor = async () => {
            return await page.evaluate(() => {
                const ul = document.querySelector('ul.pagination'); // Seleccionar <ul> con clase "pagination"
                if (!ul) return 1; // Si no existe, devolver 1

                const lis = ul.querySelectorAll('li'); // Obtener todos los <li> dentro del <ul>
                if (lis.length < 2) return 1; // Si hay menos de dos <li>, devolver 1

                const anteultimoLi = lis[lis.length - 2]; // Obtener el anteúltimo <li>
                const a = anteultimoLi.querySelector('a'); // Buscar el <a> dentro del <li>
                return a ? a.innerText.trim() : 1; // Devolver el texto del <a>, o 1 si no existe
            });
        };

        const anteultimoValor = await getAnteultimoValor();

        return anteultimoValor
    }
}

const sarroPuchetaScraperInstance = new SarroPuchetaScraper()

module.exports = sarroPuchetaScraperInstance;
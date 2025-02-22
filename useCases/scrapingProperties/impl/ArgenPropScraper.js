const puppeteer = require('puppeteer');
const { navigateWithRetry } = require('../NavigationWithRetry')

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

        let filteredList = propertyList.filter(it => it.price != null && it.address != null && it.title != null)

        return filteredList
    }

    async #scrapeDynamicWebsite(pageId, browser, urlObjective) {
        console.log(`Analizando pagina ${pageId}`)

        const page = await browser.newPage();

        // Configurar User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        await navigateWithRetry(page, `${urlObjective}${pageId}`, 3)
        // await page.goto(`${urlObjective}page=${pageId}`);

        // Evaluar el contenido de la página y extraer ambos datos
        let dataList

        const extractData = async () => {
            return await page.evaluate(() => {
                const container = document.querySelector('.listing__items');
                if (!container) return [];
    
                return Array.from(container.children).map(listing => {
                    const id = listing.id || null;
    
                    const pictureSrc = listing.querySelector('a .card__photos-box .card__carousel.simple-carousel .card__photos li:first-child img')?.src || null;
                    
                    const title = listing.querySelector('a .card__details-box h2')?.textContent.trim() || null;
    
                    const address = listing.querySelector('a .card__details-box .card__details-box-top .card__monetary-values .card__address')?.textContent.trim() || null;
    
                    const price = listing.querySelector('a .card__details-box .card__details-box-top .card__monetary-values .card__price')?.textContent.trim() || null;
    
                    const url = listing.querySelector('a')?.href || null;

                    const realState = listing.querySelector('a .card__details-box .card__details-box-top .card__agent img')?.alt || null;
    
                    return { id, pictureSrc, title, address, price, url, realState };
                });
            });
        }

        try {
            dataList = await extractData()
        } catch (e) {
            console.log(`Hubo un error haciendo scraping sobre la hoja ${pageId}`)
            console.log(error.message)
            dataList = []
        }

        console.log(`Se obtuvieron ${dataList.length} nuevas propiedades`)

        return dataList
    }

    async #getNumberOfPagesForScraping(browser, url) {
        console.log(`Se inicia obtención del ultimo valor`)

        const page = await browser.newPage();

        // Configurar User-Agent para evitar bloqueos
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        // Navegar a la página objetivo
        await navigateWithRetry(page, `${url}1`, 3)
        // await page.goto(`${url}`, { waitUntil: 'domcontentloaded' });

        // Función para obtener el valor del anteúltimo <li>
        const getLastPage = async () => {
            return await page.evaluate(() => {
                const paginationDiv = document.querySelector('.pagination.pagination--links');
                if (!paginationDiv) return null; // Si no existe la paginación, retornar null
    
                const pageItems = paginationDiv.querySelectorAll('li.pagination__page');
                if (pageItems.length === 0) return null; // Si no hay elementos <li>, retornar null
    
                const lastPage = pageItems[pageItems.length - 2]; // Anteúltimo <li>
                const lastLink = lastPage.querySelector('a'); // Etiqueta <a> dentro del <li>
                
                return lastLink ? lastLink.textContent.trim() : null;
            });
        };

        let lastPage

        try {
            lastPage = await getLastPage();
        } catch (e) {
            console.log(`Hubo un error haciendo scraping para obtener el ultimo valor`)
            console.log(error.message)
            lastPage = 1
        }

        console.log(`Se obtuvo el ultimo valor`)

        return lastPage
    }
}

const sarroPuchetaScraperInstance = new SarroPuchetaScraper()

module.exports = sarroPuchetaScraperInstance;
const puppeteer = require('puppeteer');
const { navigateWithRetry } = require('../NavigationWithRetry')

class MercadoLibreScraper {
    constructor() { }

    async scrape(objective) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Configurar User-Agent para evitar bloqueos
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        await page.goto(objective.url); // Reemplaza con la URL real

        let validator = true
        let pageId = 1

        const propertiesList = []

        propertiesList.push(...await this.#scrapeFirstWebsite(0, browser, objective.url))

        do {
            const properties = await this.#scrapeDynamicWebsite(pageId, browser, objective.url)
            if (properties.length === 0) {
                validator = false
            } else {
                propertiesList.push(...properties)
                pageId++
            }
        } while (validator)

        await browser.close();

        this.#addCity(propertiesList, objective.id)

        return propertiesList
    }

    async #scrapeDynamicWebsite(pageId, browser, urlObjective) {
        console.log(`Analizando pagina ${pageId}`)

        const page = await browser.newPage();

        // Configurar User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        const initialProperty = (pageId * 48) + 1
        const urlCompleted = `${urlObjective}_Desde_${initialProperty}_PriceRange_0USD-80000USD_NoIndex_True`

        console.log(`URL: ${urlCompleted}`)

        // page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        await navigateWithRetry(page, urlCompleted, 3)

        // Evaluar el contenido de la página y extraer ambos datos
        let data

        const extractListings = async () => {
            return await page.evaluate(() => {
                const olElement = document.querySelector('ol.ui-search-layout.ui-search-layout--grid');
                if (!olElement) return [];

                return Array.from(olElement.children).map(li => {
                    const wrapper = li.querySelector('div');
                    if (!wrapper) return null;

                    const card = wrapper.querySelector('div');
                    if (!card) return null;

                    const content = card.querySelector('div');
                    if (!content) return null;

                    const titleWrapper = content.querySelectorAll('div')[1]
                    if (!titleWrapper) return null;

                    const titleContent = titleWrapper.querySelector('h3')
                    if (!titleWrapper) return null;

                    const title = titleContent.textContent.trim();

                    const contentWrapperChildDivs = Array.from(content.querySelectorAll(':scope > div'))

                    const realState = null

                    const priceContent = contentWrapperChildDivs[1]
                    const priceContainer = priceContent.querySelector('div.poly-component__price')

                    const price = priceContainer ? priceContainer.textContent.trim() : null;

                    const urlContent = titleContent.querySelector('a')
                    const url = urlContent ? urlContent.getAttribute('href') : null

                    const addressContent = contentWrapperChildDivs[1]
                    const addressContainer = addressContent.querySelector('span.poly-component__location')
                    const address = addressContainer ? addressContainer.textContent.trim() : null

                    const imgWrapper = content.querySelector('div.poly-card__portada')
                    const imgContent = imgWrapper ? imgWrapper.querySelector('img.poly-component__picture') : null
                    const imgSrc = imgContent ? imgContent.getAttribute('src') : null
                    const imgDataSrc = imgContent ? imgContent.getAttribute('data-src') : null
                    const pictureSrc = imgSrc.includes("data:image") ? imgDataSrc : imgSrc

                    return { title, realState, price, url, address, pictureSrc };
                })
            });
        }

        try {
            data = await extractListings()
        } catch (e) {
            console.log(`Hubo un error haciendo scraping sobre la hoja ${pageId}`)
            console.log(e.message)
            data = []
        }

        this.#addIdProperty(data)

        console.log(`Se encontraron ${data.length} propiedades en la pagina ${pageId}`)

        return data
    }

    async #scrapeFirstWebsite(pageId, browser, urlObjective) {
        console.log(`Analizando pagina ${pageId}`)

        const page = await browser.newPage();

        // Configurar User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        const initialProperty = pageId * 48
        const urlCompleted = `${urlObjective}_Desde_${initialProperty}_PriceRange_0USD-80000USD_NoIndex_True`

        console.log(`URL: ${urlCompleted}`)

        // page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        await navigateWithRetry(page, urlCompleted, 3)

        // Evaluar el contenido de la página y extraer ambos datos
        let data

        const extractListings = async () => {
            return await page.evaluate(() => {
                const olElement = document.querySelector('ol.ui-search-layout.ui-search-layout--grid');
                if (!olElement) return [];

                return Array.from(olElement.children).map(li => {
                    const wrapper = li.querySelector('div');
                    if (!wrapper) return null;

                    const card = wrapper.querySelector('div');
                    if (!card) return null;

                    const content = card.querySelector('div.poly-card__content');
                    if (!content) return null;

                    const titleWrapper = content.querySelector('h3.poly-component__title-wrapper');
                    if (!titleWrapper) return null;

                    const link = titleWrapper.querySelector('a');
                    const title = link ? link.textContent.trim() : null;

                    const sellerSpan = content.querySelector('span.poly-component__seller');
                    const realState = sellerSpan ? sellerSpan.textContent.trim() : null;

                    const priceContent = content.querySelector('div.poly-component__price');
                    const price = priceContent ? priceContent.textContent.trim() : null;

                    const urlContent = titleWrapper.querySelector('a')
                    const url = urlContent ? urlContent.getAttribute('href') : null

                    const adressContent = content.querySelector('span.poly-component__location')
                    const address = adressContent ? adressContent.textContent.trim() : null

                    const imgWrapper = card.querySelector('div.poly-card__portada')
                    const imgContent = imgWrapper ? imgWrapper.querySelector('img.poly-component__picture') : null
                    const imgSrc = imgContent ? imgContent.getAttribute('src') : null
                    const imgDataSrc = imgContent ? imgContent.getAttribute('data-src') : null
                    const pictureSrc = imgSrc.includes("data:image") ? imgDataSrc : imgSrc

                    return { title, realState, price, url, address, pictureSrc };
                })
            });
        }

        try {
            data = await extractListings()
        } catch (e) {
            console.log(`Hubo un error haciendo scraping sobre la hoja ${pageId}`)
            console.log(error.message)
            data = []
        }

        this.#addIdProperty(data)

        console.log(`Se encontraron ${data.length} propiedades en la pagina ${pageId}`)

        return data
    }

    #addIdProperty(properties) {
        properties.forEach(p => {
            p.id = this.#getIdProperty(p.url)
        })
    }

    #getIdProperty(urlProperty) {
        const match = urlProperty.match(/(MLA-\d+)/);
        return match ? match[0] : null;
    }

    #addCity(properties, city) {
        properties.forEach(p => {
            p.city = city
        })
    }
}

const mercadoLibreScraperInstance = new MercadoLibreScraper()

module.exports = mercadoLibreScraperInstance;
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const loggerProcessor = require('../../loggerProcessor/LoggerProcessor');

class ZonapropScraper {
    constructor() { }

    async scrape(objective) {
        puppeteer.use(StealthPlugin());
        const browser = await puppeteer.launch({ headless: true });

        let pageId = 1
        let validator = true
        const propertiesList = []
        do {
            const newProperties = await this.#scrapeDynamicWebsite(pageId, browser, objective.url)
            propertiesList.push(...newProperties.postings)
            pageId++
            validator = newProperties.nextPage
        } while (validator)

        this.#setRealState(propertiesList)

        this.#addCity(propertiesList, objective.id)

        // Cerrar el navegador
        await browser.close();

        return propertiesList
    }

    async #scrapeDynamicWebsite(pageId, browser, urlObjective) {
        loggerProcessor.debug(`Analizando pagina ${pageId}`)

        const page = await browser.newPage();

        // Capturar los logs del navegador y mostrarlos en Node.js
        /* page.on('console', msg => {
            if (msg.text().includes("DEBUG")) loggerProcessor.debug('LOG del navegador: ', msg.text());
        }); */

        // Configurar User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        await page.goto(`${urlObjective}-pagina-${pageId}`, { waitUntil: 'networkidle2' });

        // Evaluar el contenido de la página y extraer ambos datos
        let dataList

        const extractData = async () => {
            return await page.evaluate(() => {
                const container = document.querySelector('div.postingsList-module__postings-container');
                if (!container) return [];

                // loggerProcessor.debug("DEBUG - main")

                const postings = Array.from(container.children).map(child => {
                    const mainDiv = child.querySelector('div[data-id]');
                    if (!mainDiv) return null;

                    // loggerProcessor.debug("DEBUG - 1")

                    const id = mainDiv.getAttribute('data-id');
                    const urlPath = mainDiv.getAttribute('data-to-posting');
                    const url = `https://www.zonaprop.com.ar${urlPath}`;

                    // loggerProcessor.debug("DEBUG - 2")

                    const priceDiv = mainDiv.querySelector('div.postingPrices-module__price');
                    const price = priceDiv ? priceDiv.innerText.trim() : null;

                    // loggerProcessor.debug("DEBUG - 3")

                    const addressDiv = mainDiv.querySelector('div.postingLocations-module__location-address.postingLocations-module__location-address-in-listing');
                    const address = addressDiv ? addressDiv.innerText.trim() : null;

                    // loggerProcessor.debug("DEBUG - 4")

                    const imageDiv = mainDiv.querySelector('div > div:nth-child(1) img');
                    const image = imageDiv ? imageDiv.getAttribute('src') : null;

                    // loggerProcessor.debug("DEBUG - 5")

                    const titleElements = mainDiv.querySelector('h3.postingCard-module__posting-description');
                    // loggerProcessor.debug("DEBUG - 5.1")
                    const title = titleElements ? titleElements.innerText.trim().slice(0, 100) : null;

                    // loggerProcessor.debug("DEBUG - 6")

                    const realStateImg = mainDiv.querySelector('div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) img');
                    const realState = realStateImg ? realStateImg.getAttribute('src') : null;

                    // loggerProcessor.debug("DEBUG - 7")

                    prop = { id, url, price, address, image, title, realState };

                    // loggerProcessor.debug("DEBUG - " + JSON.stringify(prop))
                    
                    return prop
                })

                const nextPageElement = document.querySelector('div.paging-module__container-paging a[data-qa="PAGING_NEXT"]');
                const nextPage = nextPageElement ? true : false;

                return { postings, nextPage };
            });
        }

        try {
            dataList = await extractData()
        } catch (e) {
            loggerProcessor.error(`Hubo un error haciendo scraping sobre la hoja ${pageId}`)
            loggerProcessor.error(e.message)
            dataList = []
        }

        loggerProcessor.debug(`Se obtuvieron ${dataList.postings.length} nuevas propiedades`)

        return dataList
    }

    #setRealState(propertiesList) {
        propertiesList.forEach(property => {
            if (property.realState) {
                const match = property.realState.match(/logo_(.*?)_\d+\.jpg$/);
                property.realState = match ? match[1] : null;
            }
        })
    }

    #addCity(properties, city) {
        properties.forEach(p => {
            p.city = city
        })
    }
}

const zonapropScraperInstance = new ZonapropScraper()

module.exports = zonapropScraperInstance;
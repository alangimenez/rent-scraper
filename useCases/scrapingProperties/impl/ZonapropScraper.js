const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

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
        console.log(`Analizando pagina ${pageId}`)

        const page = await browser.newPage();

        // Configurar User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        await page.goto(`${urlObjective}-pagina-${pageId}`, { waitUntil: 'networkidle2' });

        // Evaluar el contenido de la página y extraer ambos datos
        let dataList

        const extractData = async () => {
            return await page.evaluate(() => {
                const container = document.querySelector('div.postingsList-module__postings-container');
                if (!container) return [];

                const postings = Array.from(container.children).map(child => {
                    const mainDiv = child.querySelector('div[data-id]');
                    if (!mainDiv) return null;

                    const id = mainDiv.getAttribute('data-id');
                    const urlPath = mainDiv.getAttribute('data-to-posting');
                    const url = `https://www.zonaprop.com.ar${urlPath}`;

                    const priceDiv = mainDiv.querySelector('div.postingPrices-module__price');
                    const price = priceDiv ? priceDiv.innerText.trim() : null;

                    const addressDiv = mainDiv.querySelector('div.postingLocations-module__location-address.postingLocations-module__location-address-in-listing');
                    const address = addressDiv ? addressDiv.innerText.trim() : null;

                    const imageDiv = mainDiv.querySelector('div > div:nth-child(1) img');
                    const image = imageDiv ? imageDiv.getAttribute('src') : null;

                    const titleElements = mainDiv.querySelectorAll('div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) h3');
                    const longTitle = titleElements.length > 0 ? titleElements[titleElements.length - 1].innerText.trim() : null;
                    const title = longTitle.length > 100 ? longTitle.slice(0, 100) + "..." : longTitle;

                    const realStateImg = mainDiv.querySelector('div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) img');
                    const realState = realStateImg ? realStateImg.getAttribute('src') : null;

                    return { id, url, price, address, image, title, realState };
                })

                const nextPageElement = document.querySelector('div.paging-module__container-paging a[data-qa="PAGING_NEXT"]');
                const nextPage = nextPageElement ? true : false;

                return { postings, nextPage };
            });
        }

        try {
            dataList = await extractData()
        } catch (e) {
            console.log(`Hubo un error haciendo scraping sobre la hoja ${pageId}`)
            console.log(e.message)
            dataList = []
        }

        console.log(`Se obtuvieron ${dataList.postings.length} nuevas propiedades`)

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
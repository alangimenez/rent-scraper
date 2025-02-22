const puppeteer = require('puppeteer');
const { navigateWithRetry } = require('../NavigationWithRetry')

class ArgencasasScraper {
    constructor() { }

    async scrape(objective) {
        const browser = await puppeteer.launch();

        let propertyList = await this.#scrapeDynamicWebsite(browser, objective.url)

        await browser.close();

        propertyList.forEach(e => {
            e.city = objective.id
        })

        return propertyList
    }

    async #scrapeDynamicWebsite(browser, urlObjective) {
        console.log(`Analizando pagina única`)

        const page = await browser.newPage();

        // Configurar User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        await navigateWithRetry(page, `${urlObjective}`, 3)

        // Evaluar el contenido de la página y extraer ambos datos
        let dataList

        const extractData = async () => {
            return await page.evaluate(() => {
                const container = document.querySelector('.kol-m-9');
                if (!container) return [];
    
                return Array.from(container.querySelectorAll('.row.castle')).map(listing => {
                    const id = listing.querySelector('article .btn_ask')?.getAttribute('data-prop-code') || null;
    
                    const pictureSrc = listing.querySelector('figure a img')?.src || null;
    
                    const title = listing.querySelector('article .titulo_ficha a h2')?.textContent.trim() || null;
    
                    const price = listing.querySelector('figure .precio')?.textContent.trim() || null;
    
                    const url = listing.querySelector('figure a')?.href || null;
    
                    const address = listing.querySelector('article .direccion')?.textContent.trim() || null;
    
                    return { id, pictureSrc, title, price, url, address };
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
}

const argencasasScraperInstance = new ArgencasasScraper()

module.exports = argencasasScraperInstance;
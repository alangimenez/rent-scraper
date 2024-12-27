const puppeteer = require('puppeteer');

class NerinaAlloScraper {
    constructor() { }

    async scrape(urlObjective) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Configurar User-Agent para evitar bloqueos
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        // Navegar a la página objetivo
        await page.goto(`${urlObjective}p=1`, { waitUntil: 'domcontentloaded' });

        let propertiesList = await page.$$eval('#propiedades li', (lis) => {
            return lis.map(li => {
                const propDescTipoUb = li.querySelector('.prop-desc-tipo-ub').textContent;
                const propValorNro = li.querySelector('.prop-valor-nro').textContent;
                const destImg = li.querySelector('.dest-img').getAttribute('src');
                const link = li.querySelector('a').href;
                const propDescDir = li.querySelector('.prop-desc-dir').textContent;
                const idProp = li.querySelector('.codref.detalleColorText').textContent

                return {
                    title: propDescTipoUb,
                    price: propValorNro,
                    pictureSrc: destImg,
                    url: link,
                    address: propDescDir,
                    id: idProp
                };
            });
        });

        propertiesList.forEach(e => {
            const priceArray = e.price.split('\n')
            const unformattedPrice = priceArray[1].replaceAll("    ", "")
            e.price = unformattedPrice
        })

        let validator = true
        let pageId = 2

        while (validator) {
            const propertiesToAdd = await this.#scrapeDynamicWebsite(pageId, browser, urlObjective)
            propertiesList = [...propertiesList, ...propertiesToAdd]
            if (propertiesToAdd.length == 0) {
                validator = false
            }
            pageId++
        }

        await browser.close();

        return propertiesList
    }

    async #scrapeDynamicWebsite(pageId, browser, urlObjective) {
        const page = await browser.newPage();

        // Configurar User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        await page.goto(`${urlObjective}p=${pageId}`);

        // Evaluar el contenido de la página y extraer ambos datos
        const data = await page.evaluate(() => {
            // Obtener todos los elementos <li>
            const items = document.querySelectorAll('li');

            // Procesar cada <li> y extraer la información deseada
            return Array.from(items).map(li => {
                const tipoUb = li.querySelector('.prop-desc-tipo-ub')?.innerText || null;
                const valorNro = li.querySelector('.prop-valor-nro')?.innerText || null;
                const imgSrc = li.querySelector('img.dest-img')?.src || null;
                const href = li.querySelector('a')?.href || null;
                const descDir = li.querySelector('.prop-desc-dir')?.innerText || null;
                const idProp = li.querySelector('.codref.detalleColorText').textContent

                return {
                    title: tipoUb,
                    price: valorNro,
                    pictureSrc: imgSrc,
                    url: href,
                    address: descDir,
                    id: idProp
                };
            });
        });

        data.forEach(e => {
            const priceArray = e.price.split('\n')
            const unformattedPrice = priceArray[0].replaceAll("    ", "")
            e.price = unformattedPrice
        })

        return data
    }
}

const nerinaAlloScraperInstance = new NerinaAlloScraper()

module.exports = nerinaAlloScraperInstance;
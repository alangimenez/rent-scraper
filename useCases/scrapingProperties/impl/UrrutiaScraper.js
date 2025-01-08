const puppeteer = require('puppeteer');
const { navigateWithRetry } = require('../NavigationWithRetry')

class UrrutiaScraper {
    constructor() { }

    async scrape(objective) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Configurar User-Agent para evitar bloqueos
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        let propertiesList = []

        let validator = true
        let pageId = 2

        while (validator) {
            const propertiesToAdd = await this.#scrapeDynamicWebsite(pageId, browser, objective.url)
            propertiesList = [...propertiesList, ...propertiesToAdd]
            if (propertiesToAdd.length == 0) {
                validator = false
            }
            pageId++
        }

        // Navegar a la página objetivo
        await navigateWithRetry(page, `${objective.url}p=1`, 3)
        // await page.goto(`${objective.url}p=1`, { waitUntil: 'domcontentloaded' });

        let latestProperties

        const extractListings = async () => {
            return await page.$$eval('#propiedades li', (lis) => {
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
        }

        try {
            latestProperties = await extractListings()
        } catch (e) {
            console.log(`Hubo un error haciendo scraping sobre la ultima hoja`)
            console.log(error.message)
            listings = []
        }

        latestProperties.forEach(e => {
            const priceArray = e.price.split('\n')
            const unformattedPrice = priceArray[1].replaceAll("    ", "")
            e.price = unformattedPrice
        })

        propertiesList = [...propertiesList, ...latestProperties]

        await browser.close();

        const listWithoutDuplicates = this.#removeDuplicated(propertiesList)

        const listWithoutDuplicatesById = this.#removeDuplicatedById(listWithoutDuplicates)

        listWithoutDuplicatesById.forEach(e => {
                e.city = objective.id
            })

        return listWithoutDuplicatesById
    }

    async #scrapeDynamicWebsite(pageId, browser, urlObjective) {
        console.log(`Analizando pagina ${pageId}`)
        
        const page = await browser.newPage();

        // Configurar User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        await navigateWithRetry(page, `${urlObjective}p=${pageId}`, 3)
        // await page.goto(`${urlObjective}p=${pageId}`);

        // Evaluar el contenido de la página y extraer ambos datos
        let data

        const extractListings = async () => {
            return await page.evaluate(() => {
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
        }

        try {
            data = await extractListings()
        } catch (e) {
            console.log(`Hubo un error haciendo scraping sobre la hoja ${pageId}`)
            console.log(error.message)
            data = []
        }

        data.forEach(e => {
            const priceArray = e.price.split('\n')
            const unformattedPrice = priceArray[0].replaceAll("    ", "")
            e.price = unformattedPrice
        })

        console.log(`Se obtuvieron ${data.length} nuevas propiedades`)

        return data
    }

    #removeDuplicated(list) {
        return Array.from(new Set(list.map(JSON.stringify))).map(JSON.parse);
    }

    #removeDuplicatedById(list) {
        const seen = new Set();
        return list.filter(item => {
            if (seen.has(item.id)) {
                return false; // Si ya existe, lo omite
            } else {
                seen.add(item.id); // Agrega al conjunto de IDs vistos
                return true; // Mantiene el primero que encuentra
            }
        });
    }
}

const urrutiaScraperInstance = new UrrutiaScraper()

module.exports = urrutiaScraperInstance;
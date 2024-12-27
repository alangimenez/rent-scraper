const puppeteer = require('puppeteer');
const realState = require('../../../enums/RealStates')
const operation = require('../../../enums/Operations')
const propertyType = require('../../../enums/PropertyType')

class ICarlucciScraper {
    constructor() {}

    async scrape() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
    
        // Configurar User-Agent para evitar bloqueos
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    
        // Navegar a la página objetivo
        await page.goto('https://icarlucci.com.ar/propiedades/casas/venta?page=1', { waitUntil: 'domcontentloaded' });
    
        // Evaluar el contenido de la página para extraer el valor deseado
        const result = await page.evaluate(() => {
            // Seleccionar el contenedor principal
            const container = document.querySelector('div.col-md-9 nav ul');
    
            // Verificar si existe el contenedor y obtener todos los li.page-item
            if (!container) return null;
            const listItems = container.querySelectorAll('li.page-item');
    
            // Acceder a la antepenúltima etiqueta li
            const targetItem = listItems[listItems.length - 2];
            if (!targetItem) return null;
    
            // Extraer el texto del enlace dentro de la antepenúltima li
            const link = targetItem.querySelector('a');
            return link ? link.innerText.trim() : null;
        });
    
        // Imprimir el resultado
        console.log('Valor extraído:', result);
    
        let dataList = []
    
        for (let i = 1; i <= result; i++) {
            dataList = [...dataList, ...await this.#scrapeDynamicWebsite(i, browser)]
            i++
        }
    
        await browser.close();
    
        return dataList
    }

    async #scrapeDynamicWebsite(pageId, browser) {
        const page = await browser.newPage();
    
        // Configurar User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    
        await page.goto('https://icarlucci.com.ar/propiedades/casas/venta?page=' + pageId);
    
        // Evaluar el contenido de la página y extraer ambos datos
        const dataList = await page.evaluate(() => {
            // Seleccionar todos los div con clase 'card property-item list'
            const elements = document.querySelectorAll('div.card.property-item.list');
    
            return Array.from(elements).map(div => {
                // Extraer el texto del primer valor (h5 > a)
                const firstValue = div.querySelector('div.col-12.col-md-8.details h5 a')?.innerText.trim() || null;
    
                // Extraer el texto posterior al <br> en el segundo valor
                const secondValueElement = div.querySelector('div.col-12.col-md-8.details div.row div.col-5.col-md-6.price.d-block.d-md-none h6');
                const secondValue = secondValueElement
                    ? secondValueElement.innerHTML.split('<br>')[1]?.trim() || null
                    : null;
    
                const thirdValue = div.dataset.id

                const urlValue = div.querySelector('div.col-7.col-md-6.d-block.d-md-none.text-right.text-md-left a')?.href

                const pictureValue = div.querySelector('img')
    
                // Devolver ambos valores como un objeto
                return {
                    title: firstValue,
                    price: secondValue,
                    id: thirdValue,
                    url: urlValue,
                    pictureSrc: pictureValue.src,
                };
            });
        });

        dataList.forEach(e => {
            e.type = propertyType.House,
            e.realState = realState.ICarlucci,
            e.operation = operation.Sale
        });
    
        return dataList
    }
}

const ICarlucciScraperInstance = new ICarlucciScraper()

module.exports = ICarlucciScraperInstance;
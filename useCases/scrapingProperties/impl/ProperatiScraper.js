const puppeteer = require('puppeteer');

class ProperatiScraper {
    constructor() { }

    async scrape(objective) {
        console.log(`Inició scraping para la ciudad ${objective.id}`)

        const browser = await puppeteer.launch();
        
        let iteration = 1
        let previousPageHasContent = true
        let propertyList = []
        
        do {
            const propertiesToAdd = await this.#scraperWebsite(iteration, browser, objective.url)
            propertyList = [...propertyList, ...propertiesToAdd]
            if (propertiesToAdd.length == 0) {
                previousPageHasContent = false
            }
            iteration++
        } while (previousPageHasContent)

        propertyList.forEach(p => {
            p.city = objective.id
        })

        const propertiesWithoutNulls = propertyList.filter(property => property.id !== null)
            
        console.log(`Finalizó scraping para la ciudad ${objective.id}. Se relevaron ${propertiesWithoutNulls.length} propiedades`);

        await browser.close();

        return propertiesWithoutNulls
    }

    async #scraperWebsite(pageId, browser, url) {
        console.log(`Analizando pagina ${pageId}`)

        const page = await browser.newPage();

        // Configurar User-Agent para evitar bloqueos
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        // Navegar a la página objetivo
        await page.goto(`${url}${pageId}`, { waitUntil: 'domcontentloaded' });

        const extractListings = async () => {
            return await page.evaluate(() => {
                // Seleccionar el div principal con class "listings__cards notSponsored"
                const container = document.querySelector('div.listings__cards.notSponsored');
                if (!container) return []; // Si no existe, devolver una lista vacía

                // Seleccionar todos los enlaces <a> dentro del contenedor
                const links = container.querySelectorAll('a');
                return Array.from(links).map(link => {
                    // Imagen
                    const secondImageDiv = link.querySelector(
                        'div.listing.listing-card > div.listing-card__image > div.swiper-container.gallery-swiper-container.swiper-initialized.swiper-horizontal.swiper-pointer-events > div.swiper-wrapper > div:nth-child(2) img'
                    );
                    const imgSrc = secondImageDiv ? secondImageDiv.getAttribute('src') : null;

                    // Título
                    const titleContainer = link.querySelector(
                        'div.listing.listing-card > div.listing-card__information > div.listing-card__information-main > div.listing-card__title'
                    );
                    const title = titleContainer ? titleContainer.innerText.trim() : null;

                    // Precio
                    const priceContainer = link.querySelector(
                        'div.listing.listing-card > div.listing-card__information > div.listing-card__information-main > div.listing-card__price-wrapper > div.price'
                    );
                    const price = priceContainer ? priceContainer.innerText.trim() : null;

                    // Href del <a>
                    const href = link.getAttribute('href');
                    const completeHref = `https://www.properati.com.ar${href}`

                    // Atributo data-idanuncio
                    const listingCardDiv = link.querySelector('div.listing.listing-card');
                    const dataIdAnuncio = listingCardDiv ? listingCardDiv.getAttribute('data-idanuncio') : null;

                    return {
                        pictureSrc: imgSrc,
                        title: title,
                        price: price,
                        url: completeHref,
                        id: dataIdAnuncio,
                        address: ''
                    };
                });
            });
        };

        let listings

        try {
            listings = await extractListings();
        } catch (error) {
            console.log(`Hubo un error haciendo scraping sobre la hoja ${pageId}`)
            console.log(error.message)
            listings = []
        }

        console.log(`Se obtuvieron ${listings.length} nuevas propiedades`)

        return listings
    }
}

const properatiScraperInstance = new ProperatiScraper()

module.exports = properatiScraperInstance;
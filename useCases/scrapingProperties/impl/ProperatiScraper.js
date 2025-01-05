const puppeteer = require('puppeteer');

class ProperatiScraper {
    constructor() { }

    async scrape(objective) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Configurar User-Agent para evitar bloqueos
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        // Navegar a la página objetivo
        await page.goto(`${objective.url}1`, { waitUntil: 'domcontentloaded' });

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

                    // Atributo data-idanuncio
                    const listingCardDiv = link.querySelector('div.listing.listing-card');
                    const dataIdAnuncio = listingCardDiv ? listingCardDiv.getAttribute('data-idanuncio') : null;



                    return {
                        imgSrc,
                        title,
                        price,
                        href,
                        dataIdAnuncio
                    };
                });
            });
        };

        const listings = await extractListings();

        console.log(listings);

        await browser.close();

        return []
    }



    /* #removeDuplicated(list) {
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
    } */
}

const properatiScraperInstance = new ProperatiScraper()

module.exports = properatiScraperInstance;
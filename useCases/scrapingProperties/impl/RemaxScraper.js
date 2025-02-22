class RemaxScraper {
    constructor() { }

    async scrape(objective) {
        let url = objective.url
        let result
        const properties = []

        try {
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            let json = await response.json(); // Convertir la respuesta a JSON
            result = json.data.data
        } catch (e) {
            console.error('Error en la API call:', error);
        }

        result.forEach(property => {
            const photoUrl = property.photos[0].rawValue.replace(/\/([^\/]*)$/, "/AUTOx860/$1")

            properties.push({
                title: property.title,
                price: `${property.currency.value} ${property.price}`,
                pictureSrc: `https://d1acdg20u0pmxj.cloudfront.net/${photoUrl}.webp`,
                url: `https://www.remax.com.ar/listings/${property.slug}`,
                address: property.displayAddress,
                id: property.id
            })
        });

        return properties;
    }
}

const remaxScraperInstance = new RemaxScraper()

module.exports = remaxScraperInstance;
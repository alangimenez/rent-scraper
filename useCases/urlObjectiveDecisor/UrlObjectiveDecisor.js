const RealStates = require('../../enums/RealStates')
const PropertyType = require('../../enums/PropertyType')
const Operations = require('../../enums/Operations')
const Cities = require('../../enums/Cities')

class UrlObjectiveDecisor {
    constructor() {}

    getUrlObjective(realState, operation, propertyType) {
        const searchedCase = `${realState}-${propertyType}-${operation}`
        let urlObjective;

        switch (searchedCase) {
            case `${RealStates.ICarlucci.id}-${PropertyType.House}-${Operations.Sale}`:
                urlObjective = [
                    {
                        id: Cities.Moron,
                        url: "https://icarlucci.com.ar/propiedades/casas/venta/Argentina-Bs.As.+G.B.A.+Zona+Oeste-Mor%C3%B3n?order=1&"
                    },
                    {
                        id: Cities.Ituzaingo,
                        url: "https://icarlucci.com.ar/propiedades/casas/venta/Argentina-Bs.As.+G.B.A.+Zona+Oeste-Ituzaing%C3%B3?order=1&"
                    }
                ]
                break
            case `${RealStates.ICarlucci.id}-${PropertyType.House}-${Operations.Rent}`:
                urlObjective = [
                    {
                        id: Cities.Moron,
                        url: "https://icarlucci.com.ar/propiedades/casas/alquileres/Argentina-Bs.As.+G.B.A.+Zona+Oeste-Mor%C3%B3n?order=1&"
                    },
                    {
                        id: Cities.Ituzaingo,
                        url: "https://icarlucci.com.ar/propiedades/casas/alquileres/Argentina-Bs.As.+G.B.A.+Zona+Oeste-Ituzaing%C3%B3?order=1&"
                    }
                ]
                break
            case `${RealStates.ICarlucci.id}-${PropertyType.Field}-${Operations.Sale}`:
                urlObjective = [
                    {
                        id: Cities.Moron,
                        url: "https://icarlucci.com.ar/propiedades/terrenos+o+lotes/venta/Argentina-Bs.As.+G.B.A.+Zona+Oeste-Mor%C3%B3n?order=1&"
                    },
                    {
                        id: Cities.Ituzaingo,
                        url: "https://icarlucci.com.ar/propiedades/terrenos+o+lotes/venta/Argentina-Bs.As.+G.B.A.+Zona+Oeste-Ituzaing%C3%B3?order=1&"
                    }
                ]
                break
            case `${RealStates.NerinaAllo.id}-${PropertyType.House}-${Operations.Sale}`:
                urlObjective = [
                    {
                        id: Cities.Moron,
                        url: "https://www.allopropiedades.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26315&location_type=&ptypes=3&o=2,2&watermark=&"
                    },
                    {
                        id: Cities.Ituzaingo,
                        url: "https://www.allopropiedades.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=25983&location_type=&ptypes=3&o=2,2&watermark=&"
                    },
                    {
                        id: Cities.Haedo,
                        url: "https://www.allopropiedades.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26321&location_type=&ptypes=3&o=2,2&watermark=&"
                    }
                ]
                break
            case `${RealStates.NerinaAllo.id}-${PropertyType.Field}-${Operations.Sale}`:
                urlObjective = [
                    {
                        id: Cities.Moron,
                        url: "https://www.allopropiedades.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26315&location_type=&ptypes=1&o=2,2&watermark=&"
                    },
                    {
                        id: Cities.Ituzaingo,
                        url: "https://www.allopropiedades.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=25983&location_type=&ptypes=1&o=2,2&watermark=&"
                    },
                    {
                        id: Cities.Haedo,
                        url: "https://www.allopropiedades.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26321&location_type=&ptypes=1&o=2,2&watermark=&"
                    }
                ]
                break
            case `${RealStates.NerinaAllo.id}-${PropertyType.House}-${Operations.Rent}`:
                urlObjective = [
                    {
                        id: Cities.Moron,
                        url: "https://www.allopropiedades.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=26315&location_type=&ptypes=3&o=2,2&watermark=&"
                    },
                    {
                        id: Cities.Ituzaingo,
                        url: "https://www.allopropiedades.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=25983&location_type=&ptypes=3&o=2,2&watermark=&"
                    },
                    {
                        id: Cities.Haedo,
                        url: "https://www.allopropiedades.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=26321&location_type=&ptypes=3&o=2,2&watermark=&"
                    }
                ]
                break
                case `${RealStates.VeronicaEspinosa.id}-${PropertyType.House}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.veronicaespinosa.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26315&location_type=&ptypes=3&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.veronicaespinosa.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=25983&location_type=&ptypes=3&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.VeronicaEspinosa.id}-${PropertyType.Field}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.veronicaespinosa.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26315&location_type=&ptypes=1&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.veronicaespinosa.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=25983&location_type=&ptypes=1&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.VeronicaEspinosa.id}-${PropertyType.House}-${Operations.Rent}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.veronicaespinosa.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=26315&location_type=&ptypes=3&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.veronicaespinosa.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=25983&location_type=&ptypes=3&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.MarceloMilano.id}-${PropertyType.House}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.marcelomilano.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26315&location_type=&ptypes=3&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.marcelomilano.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=25983&location_type=&ptypes=3&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.MarceloMilano.id}-${PropertyType.Field}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.marcelomilano.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26315&location_type=&ptypes=1&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.marcelomilano.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=25983&location_type=&ptypes=1&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.MarceloMilano.id}-${PropertyType.House}-${Operations.Rent}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.marcelomilano.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=26315&location_type=&ptypes=3&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.marcelomilano.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=25983&location_type=&ptypes=3&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.Urrutia.id}-${PropertyType.House}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.urrutia.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26315&location_type=&ptypes=3&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.urrutia.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=25983&location_type=&ptypes=3&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.Urrutia.id}-${PropertyType.Field}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.urrutia.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26315&location_type=&ptypes=1&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.urrutia.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=25983&location_type=&ptypes=1&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.Urrutia.id}-${PropertyType.House}-${Operations.Rent}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.urrutia.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=26315&location_type=&ptypes=3&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.urrutia.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=25983&location_type=&ptypes=3&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.Oyhanarte.id}-${PropertyType.House}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.oyhanarteprop.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26315&location_type=&ptypes=3&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.oyhanarteprop.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=25983&location_type=&ptypes=3&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.Oyhanarte.id}-${PropertyType.Field}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.oyhanarteprop.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26315&location_type=&ptypes=1&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.oyhanarteprop.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=25983&location_type=&ptypes=1&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.Oyhanarte.id}-${PropertyType.House}-${Operations.Rent}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.oyhanarteprop.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=26315&location_type=&ptypes=3&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.oyhanarteprop.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=25983&location_type=&ptypes=3&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.DeAngelis.id}-${PropertyType.House}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.deangelis.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26315&location_type=&ptypes=3&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.deangelis.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=25983&location_type=&ptypes=3&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.DeAngelis.id}-${PropertyType.Field}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.deangelis.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=26315&location_type=&ptypes=1&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.deangelis.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=25983&location_type=&ptypes=1&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.DeAngelis.id}-${PropertyType.House}-${Operations.Rent}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.deangelis.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=26315&location_type=&ptypes=3&o=2,2&watermark=&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.deangelis.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=25983&location_type=&ptypes=3&o=2,2&watermark=&"
                        }
                    ]
                    break
                case `${RealStates.SarroPucheta.id}-${PropertyType.House}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://sarropucheta.com/propiedades/casas/venta/Argentina-G.B.A.+Zona+Oeste-Moron?order=1&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://sarropucheta.com/propiedades/casas/venta/Argentina-G.B.A.+Zona+Oeste-Ituzaing%C3%B3?order=1&"
                        }
                    ]
                    break
                case `${RealStates.SarroPucheta.id}-${PropertyType.Field}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://sarropucheta.com/propiedades/terrenos+o+lotes/venta/Argentina-G.B.A.+Zona+Oeste-Moron?order=1&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://sarropucheta.com/propiedades/terrenos+o+lotes/venta/Argentina-G.B.A.+Zona+Oeste-Ituzaing%C3%B3?order=1&"
                        }
                    ]
                    break
                case `${RealStates.SarroPucheta.id}-${PropertyType.House}-${Operations.Rent}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://sarropucheta.com/propiedades/casas/alquileres-y-alquileres+temporales/Argentina-G.B.A.+Zona+Oeste-Moron?order=1&"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://sarropucheta.com/propiedades/casas/alquileres-y-alquileres+temporales/Argentina-G.B.A.+Zona+Oeste-Ituzaing%C3%B3?order=1&"
                        }
                    ]
                    break
                case `${RealStates.Properati.id}-${PropertyType.House}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.properati.com.ar/s/moron/casa/venta/"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.properati.com.ar/s/ituzaingo/casa/venta/"
                        },
                        {
                            id: Cities.Castelar,
                            url: "https://www.properati.com.ar/s/castelar-moron/casa/venta/"
                        },
                        {
                            id: Cities.Haedo,
                            url: "https://www.properati.com.ar/s/haedo/casa/venta/"
                        }
                    ]
                    break
                case `${RealStates.Properati.id}-${PropertyType.House}-${Operations.Rent}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.properati.com.ar/s/moron/casa/alquiler/"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.properati.com.ar/s/ituzaingo/casa/alquiler/"
                        },
                        {
                            id: Cities.Castelar,
                            url: "https://www.properati.com.ar/s/castelar-moron/casa/alquiler/"
                        },
                        {
                            id: Cities.Haedo,
                            url: "https://www.properati.com.ar/s/haedo/casa/alquiler/"
                        }
                    ]
                    break
                case `${RealStates.Properati.id}-${PropertyType.Field}-${Operations.Sale}`:
                    urlObjective = [
                        {
                            id: Cities.Moron,
                            url: "https://www.properati.com.ar/s/moron/terreno/venta/"
                        },
                        {
                            id: Cities.Ituzaingo,
                            url: "https://www.properati.com.ar/s/ituzaingo/terreno/venta/"
                        },
                        {
                            id: Cities.Castelar,
                            url: "https://www.properati.com.ar/s/castelar-moron/terreno/venta/"
                        },
                        {
                            id: Cities.Haedo,
                            url: "https://www.properati.com.ar/s/haedo/terreno/venta/"
                        }
                    ]
                    break
            default: 
                throw new Error(`urlObjective not implemented for real state ${realState}, operation ${operation}, property type ${propertyType}`)
        }

        return urlObjective
    }
}

const urlObjectiveDecisor = new UrlObjectiveDecisor()

module.exports = urlObjectiveDecisor
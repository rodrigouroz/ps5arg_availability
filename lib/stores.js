import fetchSony from './sony'
import fetchCetrogar from './cetrogar'
import fetchFravega from './fravega'
import fetchMusimundo from './musimundo'
//import fetchCarrefour from './carrefour'

export default async function getStores() {

    const stores = [];

    stores.push(await fetchSony())
    stores.push(await fetchCetrogar())
    stores.push(await fetchFravega())
    stores.push(await fetchMusimundo())
    // no esta habilitado porque carga los resultados dinamicamente y tengo que ver como resolverlo con JSDOM
    //stores.push(await fetchCarrefour())

    return stores;
};

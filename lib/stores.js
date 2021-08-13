import fetchSony from './sony'
import fetchCetrogar from './cetrogar'
import fetchFravega from './fravega'
import fetchMusimundo from './musimundo'

export default async function getStores() {

    const stores = [];

    stores.push(await fetchSony())
    stores.push(await fetchCetrogar())
    stores.push(await fetchFravega())
    stores.push(await fetchMusimundo())

    return stores;
};

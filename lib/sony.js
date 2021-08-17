import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import match from './console';

const isAvailableInLanding = async landing => {
    let unavailable = false

    const data = await fetch(landing, { insecureHTTPParser: true })
    const html = await data.text()
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    if (doc.querySelector('a.buyps5') && doc.querySelector('a.buyps5').text === 'SOLD OUT') {
        unavailable = true
    }

    return unavailable
}

export default async function fetchSony() {
    const name = 'Sony'
    const url = 'https://store.sony.com.ar/playstation/consolas'
    const url_landing = 'https://store.sony.com.ar/playstation5'
    let unavailable = true

    const data = await fetch(url, { insecureHTTPParser: true })
    const html = await data.text()
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const items = doc.querySelectorAll('div[skuid]');
    if (items.length === 0) {
        // if we can't parse the items we need to check the site because something has changed
        unavailable = false;
    } else {
        // first check: list of consoles
        // every item has an anchor with a title that contains PS4
        for (let item of items.values()) {
            if (item.querySelector('a.title') && !match(item.querySelector('a.title').text)) {
                unavailable = false;
                break;
            }
        }
    }

    // second check: landing page
    if (unavailable) {
        unavailable = await isAvailableInLanding(url_landing)
    }

    return {
        name, url, unavailable
    }
}
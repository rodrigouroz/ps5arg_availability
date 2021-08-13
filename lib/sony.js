import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async function fetchSony() {
    const name = 'Sony'
    const url = 'https://store.sony.com.ar/playstation5'
    let unavailable = false

    const data = await fetch(url, { insecureHTTPParser: true })
    const html = await data.text()
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    if (doc.querySelector('a.buyps5') && doc.querySelector('a.buyps5').text === 'SOLD OUT') {
        unavailable = true
    }

    return {
        name, url, unavailable
    }
}
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import match from './console';

export default async function fetchCetrogar() {
    const name = 'Cetrogar'
    const url = 'https://www.cetrogar.com.ar/tecnologia/video-juegos/consolas.html'
    let unavailable = true

    const data = await fetch(url)
    const html = await data.text()
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const products = doc.querySelectorAll('ol.products')

    for (let item of products.values()) {
        if (!match(item.querySelector('a.product-item-link').text)) {
            unavailable = false;
            break;
        }
    }

    return {
        name, url, unavailable
    }
}
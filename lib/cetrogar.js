import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async function fetchCetrogar() {
    const name = 'Cetrogar'
    const url = 'https://www.cetrogar.com.ar/tecnologia/video-juegos/consolas.html'
    let unavailable = false

    const data = await fetch(url)
    const html = await data.text()
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const products = doc.querySelector('ol.products')

    if (products) {
        if (products.children.length == 1 && products.children[0].querySelector('a.product-item-link').text.indexOf('PS4') !== -1) {
            unavailable = true
        }
    }

    return {
        name, url, unavailable
    }
}
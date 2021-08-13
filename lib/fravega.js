import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async function fetchFravega() {
    const name = 'Fravega'
    const url = 'https://www.fravega.com/p/sony-playstation-5-ps5-342748/'
    let unavailable = false

    const data = await fetch(url)
    const html = await data.text()
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const xpath = "//b[contains(text(),'no se encuentra disponible')]";
    // XPathResult.FIRST_ORDERED_NODE_TYPE = 9, not implemented in JSDOM
    const matchingElement = doc.evaluate(xpath, doc, null, 9, null).singleNodeValue;

    if (matchingElement) {
        unavailable = true
    }

    return {
        name, url, unavailable
    }
}
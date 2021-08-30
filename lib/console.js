export default function match(str) {

    const regex = /play\s?station\s?4|ps4|playstation mega/gmi;
    let m;
    
    return regex.exec(str) !== null
}
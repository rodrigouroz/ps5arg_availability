export default function match(str) {

    const regex = /play\s?station\s?4|ps4/gmi;
    let m;
    
    return regex.exec(str) !== null
}
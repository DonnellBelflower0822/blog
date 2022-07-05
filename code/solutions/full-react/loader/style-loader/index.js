
module.exports = (source) => {
    console.log()


    return `
        var style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `
}